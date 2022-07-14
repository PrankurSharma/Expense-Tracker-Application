import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { baseUrl } from "../baseUrl";

function TotalIncome({ smallLoad }) {
    const [totalincome, settotal_income] = useState("");

    useEffect(() => {
        Axios.get(baseUrl + "/api/gettotalincome").then((response) => {
            settotal_income(response.data[0].amTotal);
        });
    }, [smallLoad]);

    return (
        <>
            <h1 className="record"> Income: ₹ {totalincome} </h1>
        </>
    );
}
export default TotalIncome;