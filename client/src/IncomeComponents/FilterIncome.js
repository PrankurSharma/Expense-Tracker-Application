import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function FilterIncome({ smallLoad, month, year }) {
    const isMounted = useRef(false);
    const [filter_income, setfilter_income] = useState("0");
    useEffect(() => {
        if(isMounted.current){
            if (month !== "month" && year !== "year") {
                Axios.post(baseUrl + "/api/filterincome", {
                    month: month,
                    year: year
                }).then((response) => {
                    setfilter_income(response.data[0].amTotal);
                });
            }
        }
        else{
            isMounted.current = true;
        }
    }, [smallLoad]);

    return (
        <>
            <h1 className='heading'> Income for the chosen month: ₹ {filter_income} </h1>
        </>
    );
}
export default FilterIncome;