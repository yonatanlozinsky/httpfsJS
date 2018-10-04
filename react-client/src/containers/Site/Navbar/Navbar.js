import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const navbar = (props) =>{

    let loginObj = {
        btnText: "Sign Up",
        btnLink: "/signup"
    }

    if (props.user){
        loginObj.btnLink = "/users/logout"
        loginObj.btnText = `Log out from ${props.user}!`
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/upload">Upload</Link></li>
                    <li className="signup-btn"><Link to={loginObj.btnLink}>{loginObj.btnText}</Link></li>
                </ul>
            </nav>

        </div>
    );
}

export default navbar;