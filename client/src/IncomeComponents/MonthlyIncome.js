import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ChartsIncome from '../ChartComponents/ChartsIncome';
import { baseUrl } from '../baseUrl';
import LoadingBars from '../LoadingBars';

function MonthlyIncome({ monthmoney, smallLoad, fetchData, fetched }) {
    const [monthincome, setmonth_income] = useState("0");

    useEffect(() => {
        Axios.get(baseUrl + "/api/getmonthincome").then((response) => {
            setmonth_income(response.data[0].amTotal);
            fetchData((fetches) => !fetches);
        });
    }, [smallLoad]);

    if(!fetched) {
        return (
            <LoadingBars />
        );
    }
    else{
        return (
            <>
                {!monthmoney.length ? <div className="notrans"> </div> : <div className="income">
                    <h2 className="record"> Income For This Month: ₹ {monthincome} </h2>
                    <ChartsIncome smallLoad={smallLoad} />
                </div>}
            </>
        );
    }
}
export default MonthlyIncome;