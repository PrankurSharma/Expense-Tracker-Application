import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { baseUrl } from "../baseUrl";

function FilterTransactionsComponent({ month, year, smallLoad, updateMoney }) {
    const isMounted = useRef(false);
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
        if (isMounted.current) {
            if (month === "month" || year === "year") {
                alert("Please fill both the fields in order to proceed.");
            }
            else {
                Axios.post(baseUrl + "/api/filter", {
                    month: month,
                    year: year
                }).then((response) => {
                    if(response.data.message){
                        logout();
                    }
                    else{
                        updateMoney(response.data);
                    }
                });
            }
        }
        else {
            isMounted.current = true;
        }
    }, [smallLoad]);

    return (
        <></>
    );
}
export default FilterTransactionsComponent;