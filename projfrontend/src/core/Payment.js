import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react"
import { createOrder } from "./helper/orderhelper";
import { getToken, processPayment } from "./helper/paymentHelper"
import { emptyCart } from './helper/cartHelper';

const Payment = ({ products, setReload, reload={undefined} }) => {

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        instance: {},
        error: ""
    })

    const getAToken = (userId, token) => {
        getToken(userId, token)
            .then(info => {
                console.log(info);
                if (info.error) {
                    setInfo({ ...info, error: info?.error })
                } else {
                    const clientToken = info.clientToken;
                    setInfo({ clientToken })
                }
            })
    }


    const showDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success rounded" onClick={onPurchase}>Buy</button>
                    </div>
                ) 
                : (
                        <h3>Add something to cart</h3>
                )}
            </div >
        )
    }

    const onPurchase = () => {
        setInfo({loading: true});
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce : nonce,
                    amount: getAmount()
                };
                processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({...info, loading: false, success: response.success})
                    console.log("PAYMENT SUCCESSFUL");
                    const orderData = {
                        products : products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId, token, orderData);
                    emptyCart();
                    setReload(!reload)
                })
                .catch(error => {
                    setInfo({...info, loading: false, success: false, error: error})
                    console.log("PAYMENT UNSUCCESSFUL");
                })
            })


    }



    const getAmount = () => {
        let amount = 0;
        products.map((product) => (
            amount = amount + product.price
        ))
        return amount;
    }

    const getCount = () => {
        let count = 0;
        products.map((product)=> (
            count = count + 1
        ))
        return count;
    }


    useEffect(() => {
        getAToken(userId, token)
    }, [])


    



    return (
        <div>
            <h2 className="text-info">Billing details</h2>
            <div className="text-warning border border-info rounded my-3 py-3">
                <h4>Total Products: {getCount()}</h4>
                <h4>Total Amount: &#8377;{getAmount()}</h4>
            </div>
            
            {showDropIn()}
        </div>
    )
}

export default Payment;