import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const navbar = (props) =>{

    let loginObj = {
        btnText: "Sign Up",
        btnLink: "/signup",
        onClickAction: ()=>{console.log("")}
    }

    if (props.isUser){
        loginObj.btnLink = "/"
        loginObj.btnText = "Logout from "+props.user;
        loginObj.onClickAction = props.logoutHandler;
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><Link to="/">{props.isUser?"Upload":"Login"}</Link></li>
                    {props.isUser?
                    <li><Link to="/allfiles">Your Files</Link></li>:""}
                    <li className="signup-btn"><Link onClick={loginObj.onClickAction} to={loginObj.btnLink}>{loginObj.btnText}</Link></li>
                </ul>
            </nav>

        </div>
    );
}

export default navbar;