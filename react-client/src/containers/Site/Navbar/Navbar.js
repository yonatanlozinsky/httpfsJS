import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const navbar = (props) =>{

    let loginObj = {
        btnText: "Sign Up",
        btnLink: "/signup",
        onClickAction: ()=>{console.log("Entered signup")}
    }

    if (props.isUser){
        loginObj.btnLink = "/"
        loginObj.btnText = props.user;
        loginObj.onClickAction = props.logoutHandler;
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/upload">Upload</Link></li>
                    <li className="signup-btn"><Link onClick={loginObj.onClickAction}  to={loginObj.btnLink}>{loginObj.btnText}</Link></li>
                </ul>
            </nav>

        </div>
    );
}

export default navbar;