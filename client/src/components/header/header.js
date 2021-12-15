import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import './header.scss'

const HomePage = () => {
    return (
        <div className="img-wrap">
            <Link to="/">
                <img className="logo" src={logo} alt="logo" width="767" height="103"/>
            </Link>
        </div>
    );
}

export default HomePage;