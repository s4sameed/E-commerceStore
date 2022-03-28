import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from "react-router-dom"
import { createProduct, getAllCategories } from "./helper/adminapicall"
import { isAuthenticated } from "../auth/helper/index"

const AddProduct = () => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        photo: "",
        categories: [],
        error: "",
        success: "",
        formData: ""
    });



    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        error,
        success,
        formData
    } = values;


    const preload = () => {
        getAllCategories()
            .then(data => {
                if (data?.error) {
                    setValues({ ...values, error: data?.error })
                } else {
                    setValues({ ...values, categories: data, formData: new FormData() })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        preload();
    }, [])


    const goBack = () => (
        <div className="mt-4">
            <Link className="btn button-small btn-outline-info rounded mb-3" to="/admin/dashboard">
                Go Back
            </Link>
        </div>
    )


    const successMessage = () => (
        <div
            className="alert alert-success my-3"
            style={{ display: success ? "" : "none" }}
        >
            Product created.
        </div>
    )


    const errorMessage = () => (
        <div
            className="alert alert-danger my-3"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    )



    const onSubmit = (e) => {
        e.preventDefault();
        if(
            photo==="" ||
            name==="" ||
            description==="" ||
            price==="" ||
            category === "" ||
            stock===""
        )
        {
            setValues({...values, error:"Please fill all fields"})
            return;
        }

        createProduct(user._id, token, formData)
            .then(data => {
                if (data?.error) {
                    setValues({ ...values, error: data?.error })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        error:"",
                        success: true
                    })
                }
            })
    }


    const handleChange = name => e => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }



    const createProductForm = () => (
        <form className="my-4">
            <span>Uplaod photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-info rounded">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && (
                        categories.map((cat, index) => (
                            <option key={index} value={cat._id}>{cat.name}</option>
                        ))
                    )}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-info rounded">
                Create Product
          </button>
        </form>
    );


    return (
        <Base
            title={"Create product"}
            description={"Add a new product to you website"}
            className={"container bg-info rounded py-4 mb-4"}
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    {errorMessage()}
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct;