import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from "react-router-dom"
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getAllProducts } from './helper/adminapicall';
import { IMG } from '../backend';


const ManageProducts = () => {

    const { user, token } = isAuthenticated();

    const [products, setProducts] = useState([]);


    const preload = () => {
        getAllProducts()
            .then(data => {
                if (data?.error) {
                    console.log(data?.error);
                } else {
                    setProducts(data)
                }
            })
    }


    useEffect(() => {
        preload();
    }, [])



    const goBack = () => (
        <div className="mt-4 mb-3">
            <Link className="btn button-small btn-outline-info rounded mb-3" to="/admin/dashboard">
                Go Back
            </Link>
        </div>
    )



    const removeProduct = (productId) => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data?.error) {
                    console.log(data?.error);
                } else {
                    preload();
                }
            })
    }



    return (
        <Base title="Manage Products" description="You can manage all your products here">
            {goBack()}
            <h1 className="mb-5">
                <span className="badge badge-warning">
                    {`Total Products: ${products.length}`}
                </span>
            </h1>
            <div className="row">
                <div className="col-12">
                    {products.map((product, index) => {
                        return (
                            <div className="row text-center mb-4" key={index}>
                                <div className="col-4">
                                    <div className="card bg-dark border border-info" style={{width: "20rem"}}>
                                        <img className="card-img-top" src={`${IMG}${product.photo}`} alt="product"/>
                                            <div 
                                            className="card-body bg-dark border-top border-info pb-1"
                                            >
                                                <h5 className="card-title text-capitalize">Name: {product.name}</h5>
                                                <p className="card-text text-capitalize">Description: {product.description}</p>
                                                <p>Price: {product.price}</p>
                                                <p>Stock: {product.stock}</p>
                                            </div>
                                    </div>

                                </div>
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                        <Link
                                            className="btn btn-success rounded"
                                            to={`/admin/products/update/${product._id}`}
                                        >
                                            <span className="">Update Product</span>
                                        </Link>
                                </div>
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    <button onClick={() => {
                                            removeProduct(product._id)
                                        }} className="btn btn-danger rounded">
                                            Delete Product
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                            </div>
            </div>
        </Base>
    )
}

export default ManageProducts;