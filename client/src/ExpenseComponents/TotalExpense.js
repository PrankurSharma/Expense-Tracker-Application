import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';
import LoadingBars from '../LoadingBars';

function TotalExpense({ smallLoad, fetchData, fetched }) {
    const [totalexpense, settotal_expense] = useState("0");

    useEffect(() => {
        Axios.get(baseUrl + "/api/gettotalexpense").then((response) => {
            settotal_expense(response.data[0].amTotal);
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
                <h1 className="record"> Expenses: ₹ {totalexpense} </h1>
            </>
        );
    }
}
export default TotalExpense;