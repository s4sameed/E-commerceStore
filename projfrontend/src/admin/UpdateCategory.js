import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { updateCategory } from './helper/adminapicall';



const UpdateCategory = ({match, history}) => {

    const [name, setName] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [didRedirect, setdidRedirect] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn button-small btn-outline-info rounded mb-3" to="/admin/categories">
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
        updateCategory(match.params.categoryId, user._id, token, { name })
            .then(data => {
                if (data?.error) {
                    setError(data?.error);
                    setSuccess(false);
                } else {
                    setName("");
                    setError("");
                    setSuccess(true);
                    setdidRedirect(true);
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
            Category updated.
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


    const redirect = () => {
        didRedirect && (
            setTimeout(()=>{
                setSuccess(false);
                setdidRedirect(false);
                history.push('/admin/categories')
            }, 3000)
        )
    }


    const categoryForm = () => (
        <form className="my-3">
            <div className="form-froup">
                <p className="lead">Enter the new name of category:</p>
                <input
                    type="text"
                    className={"form-control my-3"}
                    onChange={handleChange}
                    value={name || ""}
                    required
                    autoFocus
                />
                <button onClick={onSubmit} className="btn btn-outline-info rounded">Update</button>
            </div>
        </form>
    )

    return (
        <Base
        title={"Update category"}
        description={"You can update the name of your category by filling this form"}
        className={"container bg-info rounded py-4"} 
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    {successMessage()}
                    {errorMessage()}
                    {categoryForm()}
                    {redirect()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateCategory;