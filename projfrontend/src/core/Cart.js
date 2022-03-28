import React, { useState, useEffect } from "react"
import Base from "./Base"
import Card from "./Card"
import { loadCart } from "./helper/cartHelper"
import Payment from "./Payment"


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload])


    const loadCartProducts = () => {
        if(localStorage.getItem("cart")){
            return (
                <div>
                    <h2 className="text-warning">Here's what's in your bag.</h2>
                    {products.map((product, index) => (
                        <Card key={index}
                            product={product}
                            addToCart={false}
                            removeFromCart={true}
                            reload={reload}
                            setReload={setReload}
                        />
                    ))}
    
                </div>
            )
        }
    }


    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-xs-12 col-md-5 offset-md-1">
                    {localStorage.getItem("cart")
                    ? loadCartProducts() 
                    : <h2 className="text-info">Your cart is currently empty.</h2>
                    }
                </div>
                <div className="col-xs-12 col-md-5">
                    <Payment products={products} setReload={setReload} reload={reload}/>
                </div>
            </div>
        </Base>
    )
}

export default Cart;