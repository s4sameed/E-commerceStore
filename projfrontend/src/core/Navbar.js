import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from "../auth/helper/index"
import {FaShoppingCart, FaUserPlus, FaUser, FaUserCircle} from "react-icons/fa"
import {AiFillHome} from "react-icons/ai"
import {RiLogoutCircleLine} from "react-icons/ri"


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#5cb85c" }
    } else {
        return { color: "#FFFFFF" }
    }
}


const Navbar = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark d-flex flex-row justify-content-between">
            <div className="d-flex">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    <AiFillHome/> Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
                        <FaShoppingCart/> Cart 
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
                            <FaUserCircle/> Dashboard
                        </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                        <FaUserCircle/> Admin Dashboard
                        </Link>
                    </li>
                )}
            </div>

            <div className="d-flex">
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                            <FaUserPlus style={{ fontSize:"1.5rem" }}/> Sign Up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin"> <FaUser/> Sign In</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link text-warning"
                            onClick={() => {
                                signout(() => {
                                    history.push("/")
                                })
                            }}
                        ><RiLogoutCircleLine/> Sign Out</span>
                    </li>
                )}
            </div>
        </ul>
    </div>
);


export default withRouter(Navbar);