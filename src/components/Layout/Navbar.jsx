import React from "react"
import './Navbar.css'

const Navbar = () => {
    // Halaman
    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top nav-bar">
                <div className="container">
                    <a className="navbar-brand" href="/" aria-label="vigenesia" style={{color:"rgb(11, 97, 255)"}}>Vigenesia</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{border:"none"}}>
                        <i className="bi bi-grid-fill" style={{fontSize:"22px"}}></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="https://webew.id" aria-label="Home">Home</a></li>
                    </ul>
                    <div className="d-flex" role="search">
                        <a href="/" className="btn btn-login" type="button" aria-label="Login">Login</a>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar