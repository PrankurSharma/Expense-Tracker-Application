import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function FilterIncome({ smallLoad, month, year }) {
    const [filter_income, setfilter_income] = useState("");
    useEffect(() => {
        if (month && year) {
            Axios.post(baseUrl + "/api/filterincome", {
                month: month,
                year: year
            }).then((response) => {
                setfilter_income(response.data[0].amTotal);
            });
        }
    }, [smallLoad]);

    return (
        <>
            <h1 className='heading'> Income for the chosen month: ₹ {filter_income} </h1>
        </>
    );
}
export default FilterIncome;