import React from 'react';
import Navbar from "./Navbar"
import Footer from "./Footer"

const Base = ({
    title="My Title",
    description="My description",
    className = "container-fluid bg-dark text-white p-4",
    children
}) => (
    <div>
        <Navbar/>
        <div className="container" id="main">
            <div className="jumbotron bg-dark text-white text-center pb-0" >
                <h2 className="display-4">{title}</h2> 
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        <Footer/>
        
    </div>
)

export default Base;