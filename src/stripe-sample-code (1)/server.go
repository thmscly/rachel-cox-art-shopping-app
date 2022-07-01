package main

import (
    "log"
    "net/http"
    "github.com/stripe/stripe-go/v72"
    "github.com/stripe/stripe-go/v72/checkout/session"
)

func main() {
  // This is your test secret API key.
  stripe.Key = "sk_test_51Kr7hiCyDKFdIKJoL1DzZ6OUgGqNYBQM4EPj9gZnTW4NkhDQERAuzjPIliQr1Kvv1lRBIKSB4fMRier2shBz7hTd00Oq7pn0tO"

  http.Handle("/", http.FileServer(http.Dir("public")))
  http.HandleFunc("/create-checkout-session", createCheckoutSession)
  addr := "localhost:4242"
  log.Printf("Listening on %s", addr)
  log.Fatal(http.ListenAndServe(addr, nil))
}

func createCheckoutSession(w http.ResponseWriter, r *http.Request) {
  domain := "http://localhost:4242"
  params := &stripe.CheckoutSessionParams{
    LineItems: []*stripe.CheckoutSessionLineItemParams{
      &stripe.CheckoutSessionLineItemParams{
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        Price: stripe.String("{{PRICE_ID}}"),
        Quantity: stripe.Int64(1),
      },
    },
    Mode: stripe.String(string(stripe.CheckoutSessionModePayment)),
    SuccessURL: stripe.String(domain + "?success=true"),
    CancelURL: stripe.String(domain + "?canceled=true"),
    AutomaticTax: &stripe.CheckoutSessionAutomaticTaxParams{Enabled: stripe.Bool(true)},
  }

  s, err := session.New(params)

  if err != nil {
    log.Printf("session.New: %v", err)
  }

  http.Redirect(w, r, s.URL, http.StatusSeeOther)
}