import React from 'react'

export default function Header(props) {
    const { countCartItems } = props;
    return (
        <header className='row block center'>
            <div>
                {/* <a href='#/'></a> */}
                <h1 className='title'>Rachel Cox Art</h1>
            </div>
            <div>
                <a href="#/cart">

                    Cart{' '}
                    {countCartItems ? (
                        <button className='badge'>{countCartItems}</button>
                    ) : (
                        ''
                    )
                    }

                </a>
            </div>
        </header>
    )
}
