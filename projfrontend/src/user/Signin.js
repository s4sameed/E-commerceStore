import React,{useState} from 'react';
import Base from "../core/Base"
import {Redirect} from "react-router-dom" 

import {signin, authenticate, isAuthenticated} from "../auth/helper/index"

const Signin = () => {

    const[values, setValues] = useState({
        email:"bbc@abc.com",
        password:"12345678",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false, loading:true })
        signin({email, password})
        .then(data => {
            if(data?.error){
                setValues({ ...values, error: data?.error, loading:false })
            }else{
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(err => {
            console.log("Error in SignIn")
        })
    }


    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>

            }else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const loadingMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-warning"
                        style={{ display: loading ? "" : "none" }}
                    >
                        Loading...
                    </div>
                </div>
            </div>
        )
    }


    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }


    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                                className="form-control" 
                                type="email"
                                value={email}
                                onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                                className="form-control" 
                                type="password"
                                value={password}
                                onChange={handleChange("password")}
                            />
                        </div>
                        <button 
                            onClick={handleSubmit} 
                            className="btn btn-success text-black btn-block mt-4"
                        >Sign in</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign in" description="Welcome back. Please login to your account">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin;