import React from "react"

const Footer = () => (
    <footer className="footer bg-dark mt-auto container-fliud mt-5 pt-3 ">
        <div className="container-fluid bg-success text-white text-center py-3">
            <h4>If any questions, feel free to ask</h4>
            <button className="btn btn-warning btn-lg">Contact</button>
        </div>
        <div className="container d-flex justify-content-between">
            <span className="text-muted">An amazing <span className="text-white">T-shirt</span> store</span>
            <span className="text-white">Copyright &copy; 2020, MyStore </span>
        </div>
    </footer>
);

export default Footer;