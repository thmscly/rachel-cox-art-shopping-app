import React from "react";

export default function Basket(props) {
    const { cartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.0975;
    const shippingPrice = 5;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return (
        <aside className="block col-1">
            <h2>Your Cart</h2>
            <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>
            {cartItems.map((item) => (
                <div key={item.id} className="row">
                    <div className="col-2">{item.name}</div>
                    <div className="col-2">
                        <button onClick={() => onAdd(item)} className="add">
                            +
                        </button>
                        <button onClick={() => onRemove(item)} className="remove">
                            -
                        </button>
                    </div>
                    <div className="col-2 text-right">
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <>
                    <hr />
                    <div className="row">
                        <div className="col-2"> Subtotal</div>
                        <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2"> Tax</div>
                        <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2"> Shipping</div>
                        <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2"> <strong>Total</strong></div>
                        <div className="col-1 text-right"><strong>${totalPrice.toFixed(2)}</strong></div>
                    </div>
                    <hr />
                    <div className="row">
                        <button onClick={() => alert('Checkout')}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </aside>
    );
}
