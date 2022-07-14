import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function TotalExpense({ smallLoad }) {
    const [totalexpense, settotal_expense] = useState("");

    useEffect(() => {
        Axios.get(baseUrl + "/api/gettotalexpense").then((response) => {
            settotal_expense(response.data[0].amTotal);
        });
    }, [smallLoad]);

    return (
        <>
            <h1 className="record"> Expenses: ₹ {totalexpense} </h1>
        </>
    );
}
export default TotalExpense;