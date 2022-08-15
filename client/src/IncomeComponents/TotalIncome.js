import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { baseUrl } from "../baseUrl";
import LoadingBars from "../LoadingBars";

function TotalIncome({ smallLoad, fetchData, fetched }) {
    const [totalincome, settotal_income] = useState("0");

    useEffect(() => {
        Axios.get(baseUrl + "/api/gettotalincome").then((response) => {
            settotal_income(response.data[0].amTotal);
            fetchData((fetches) => !fetches);
        });
    }, [smallLoad]);

    if(!fetched){
        return (
            <LoadingBars />
        );
    }
    else{
        return (
            <>
                <h1 className="record"> Income: ₹ {totalincome} </h1>
            </>
        );
    }
}
export default TotalIncome;