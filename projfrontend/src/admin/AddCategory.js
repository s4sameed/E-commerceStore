import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';



const AddCategory = () => {

    const [name, setName] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn button-small btn-outline-info rounded mb-3" to="/admin/dashboard">
                Go Back
            </Link>
        </div>
    )


    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        //backend call
        createCategory(user._id, token, { name })
            .then(data => {
                if (data?.error) {
                    setError(data?.error);
                    setSuccess(false);
                } else {
                    setName("");
                    setError("");
                    setSuccess(true);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const successMessage = () => (
        <div
            className="alert alert-success my-3"
            style={{ display: success ? "" : "none" }}
        >
            Category created.
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


    const categoryForm = () => (
        <form className="my-3">
            <div className="form-froup">
                <p className="lead">Enter the name of category:</p>
                <input
                    type="text"
                    className={"form-control my-3"}
                    onChange={handleChange}
                    value={name || ""}
                    required
                    autoFocus
                />
                <button onClick={onSubmit} className="btn btn-outline-info rounded">Create</button>
            </div>
        </form>
    )

    return (
        <Base
        title={"Create category"}
        description={"Add a new category to you website"}
        className={"container bg-info rounded py-4"} 
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    {successMessage()}
                    {errorMessage()}
                    {categoryForm()}
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;