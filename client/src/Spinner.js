import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Axios from "axios";
import { baseUrl } from './baseUrl';

function Spinner({ handleChange, fetchDetails }) {
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    const logout = () => {
        Axios.get(baseUrl + "/api/logout").then((response) => {
            navigateToLogin();
        });
    }

    useEffect(() => {
        Axios.get(baseUrl + "/api/login").then((response) => {
            if (response.data.message) {
                logout();
            }
            else if (response.data.error) {
                navigateToLogin();
                alert(response.data.error);
            }
            else {
                fetchDetails(response.data[0].person_id, response.data[0].username);
                handleChange(false);
            }
        })
    }, []);
    return (
        <div className='spinner'>
            <ReactLoading type="spin" color="rgba(138, 43, 226)" height={150} width={70} />
        </div>
    );
}

export default Spinner;