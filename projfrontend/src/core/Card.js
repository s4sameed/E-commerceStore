import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import { IMG } from '../backend';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';




const Card = ({ 
    product, 
    addToCart = true, 
    removeFromCart = false, 
    reload = undefined ,
    setReload
}) => {

    const [redirect, setRedirect] = useState(false);



    const getRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }


    const addInCart = () => {
        addItemToCart(product, ()=>setRedirect(true));
    }



    const showAddToCart = addToCart => {
        return (addToCart &&
            <div className="col-12">
                <button
                    onClick={addInCart}
                    className="btn btn-block btn-outline-success rounded mt-2 mb-2"
                >
                    Add to Cart
                </button>
            </div>

        )
    }


    const showremoveFromCart = removeFromCart => {
        return ( removeFromCart && 
            <div className="col-12">
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger rounded mt-2 mb-2"
                >
                    Remove from cart
                </button>
            </div>
        )
    }



    return (
        <div className="card text-dark bg-light border border-primary my-3 animate__animated animate__zoomInDown">
            <div className="card-header lead text-capitalize">{product.name}</div>
            <div className="card-body">
                <div className="rounded border border-success p-2">
                    <img
                        src={`${IMG}${product.photo}`}
                        alt="product"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                        className="rounded"
                    />
                </div>
                <p className="lead border border-info rounded font-weight-normal text-wrap text-capitalize p-3 my-3">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">&#8377; {product.price}</p>
                <div className="row">
                    {showAddToCart(addToCart)}
                    {showremoveFromCart(removeFromCart)}
                </div>
            </div>
            {getRedirect(redirect)}
        </div>
        
    );
};



export default Card;