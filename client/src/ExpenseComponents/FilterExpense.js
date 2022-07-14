import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function FilterExpense({ smallLoad, month, year }) {
    const [filter_expense, setfilter_expense] = useState("");
    useEffect(() => {
        if (month && year) {
            Axios.post(baseUrl + "/api/filterexpense", {
                month: month,
                year: year
            }).then((response) => {
                setfilter_expense(response.data[0].amTotal);
            });
        }
    }, [smallLoad]);

    return (
        <>
            <h1 className='heading'> Expenses for the chosen month: ₹ {filter_expense} </h1>
        </>
    );
}
export default FilterExpense;