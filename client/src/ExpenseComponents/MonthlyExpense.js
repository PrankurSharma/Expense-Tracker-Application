import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ChartsExpense from '../ChartComponents/ChartsExpense';
import { baseUrl } from '../baseUrl';

function MonthlyExpense({ monthmoney, smallLoad, fetchData }) {
    const [monthexpense, setmonth_expense] = useState("0");

    useEffect(() => {
        Axios.get(baseUrl + "/api/getmonthexpense").then((response) => {
            setmonth_expense(response.data[0].amTotal);
        });
    }, [smallLoad]);

    return (
        <>
            {!monthmoney.length ? <div className="notrans"> </div> : <div className="expense">
                <h2 className="record"> Expenses For This Month: ₹ {monthexpense} </h2>
                <ChartsExpense smallLoad={smallLoad} />
            </div>}
        </>
    );
}
export default MonthlyExpense;