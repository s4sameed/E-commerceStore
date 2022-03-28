import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getAllCategories, deleteCategory } from "./helper/adminapicall"

const ManageCategories = () => {

    const { user, token } = isAuthenticated();

    const [categories, setCategories] = useState([]);


    const loadCategories = () => {
        getAllCategories()
            .then(data => {
                if (data?.error) {
                    console.log(data?.error);
                } else {
                    setCategories(data)
                }
            })
    }


    useEffect(() => {
        loadCategories();
    }, [])



    const goBack = () => (
        <div className="mt-4 mb-3">
            <Link className="btn button-small btn-outline-info rounded mb-3" to="/admin/dashboard">
                Go Back
            </Link>
        </div>
    )


    const removeCategory = (categoryId) => {
        deleteCategory(categoryId, user._id, token)
        .then(data => {
            if(data?.error){
                console.log(data?.error)
            }else{
                loadCategories();
            }
        })

    }


    return (
        <Base title={"Manage Categories"} description={"You can manage all your categories here"}>
            {goBack()}
            <h1 className="mb-4">
                <span className="badge badge-warning">
                    {`Total Categories: ${categories.length}`}
                </span>
            </h1>
            <div className="row">
                <div className="col-12">
                    {categories.map((category, index) => {
                        return (
                            <div className="row text-center mb-4" key={index}>
                                <div className="col-4">
                                    <h2 className="text-white text-left">{category.name}</h2>
                                </div>
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    <Link
                                        className="btn btn-success rounded"
                                        to={`/admin/categories/update/${category._id}`}
                                    >
                                        <span className="">Update Category</span>
                                    </Link>
                                </div>
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    <button onClick={() => {
                                        removeCategory(category._id)
                                    }} className="btn btn-danger rounded">
                                        Delete Category
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

export default ManageCategories;