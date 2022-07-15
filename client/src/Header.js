import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { baseUrl } from "./baseUrl";

function Header({ user_id, user_name }) {
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const logout = () => {
        Axios.get(baseUrl + "/api/logout").then((response) => {
            alert("Please click OK to proceed logging out.");
            navigateToLogin();
        });
    }
    return (
        <div>
            <div>
                <Link to="/">
                    <img src='/logo.png' alt="Finer" />
                </Link>
            </div>
            <div className="divhead">
                <h1 className="head"> Hi {user_name}, </h1>
                <h3 className="head"> ({user_id}) </h3>
                {!user_name.length ? null : <button className="button" onClick={() => {
                    logout();
                }}> Logout </button>}
            </div>
        </div>
    );
}
export default Header;