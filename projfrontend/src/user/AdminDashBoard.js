import React,{useState, useEffect} from 'react';
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"
import {getAllCategories, getAllProducts} from "../admin/helper/adminapicall"

const AdminDashBoard = () => {

    const{user: {name, email}} = isAuthenticated();

    const[categories, setCategories] = useState([]);
    const[products, setProducts] = useState([]);


    const preloadData = () => {
        getAllCategories()
        .then(data => {
            if(data?.error){
                console.log("Error in loading categories");
            }else{
                setCategories(data)
            }
        })
        getAllProducts().then(data => {
            if(data?.error){
                console.log("Error in loading products");
            }else{
                setProducts(data)
            }
        })
        .catch(err => {
            console.log("Error in loading both categories & products");
        })
    }


    useEffect(()=> {
        preloadData();
    },[])


    const adminLeftSide = () => {
       return(
        <div className="card">
            <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link 
                    to="/admin/create/category" 
                    className="nav-link text-success"
                    >
                        Create category
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link 
                    to="/admin/categories" 
                    className="nav-link text-success"
                    >
                        Manage categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link 
                    to="/admin/create/product" 
                    className="nav-link text-success"
                    >
                        Create product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link 
                    to="/admin/products" 
                    className="nav-link text-success"
                    >
                        Manage products
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link 
                    to="/admin/orders" 
                    className="nav-link text-success"
                    >
                        Manage orders
                    </Link>
                </li>
            </ul>
        </div>
       );
    }

    const adminRightSide = () => {
        return(
            <div className="card">
                <h4 className="card-header">Hi Admin</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h4>
                            <span className="badge badge-success mr-3">Name:</span>{name}
                        </h4>
                    </li>
                    <li className="list-group-item">
                        <h4>
                            <span className="badge badge-success mr-3">Email:</span>{email}
                        </h4>
                    </li>
                    <li className="list-group-item">
                        <h4>
                            <span className="badge badge-success mr-3">Total Products:</span>{products.length}
                        </h4>
                    </li>
                    <li className="list-group-item">
                        <h4>
                            <span className="badge badge-success mr-3">Total Categories:</span>{categories.length}
                        </h4>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <Base 
        title={"Welcome to Admin DashBoard"} 
        description={"Manage all of your products here"}
        className={"container, bg-success mb-4 p-4"}
        >
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    );
}

export default AdminDashBoard;