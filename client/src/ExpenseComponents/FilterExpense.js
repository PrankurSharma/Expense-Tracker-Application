import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function FilterExpense({ smallLoad, month, year }) {
    const isMounted = useRef(false);
    const [filter_expense, setfilter_expense] = useState("");
    useEffect(() => {
        if(isMounted.current){
            if(month !== "month" && year !== "year"){
                Axios.post(baseUrl + "/api/filterexpense", {
                    month: month,
                    year: year
                }).then((response) => {
                    setfilter_expense(response.data[0].amTotal);
                });
            }
        }
        else{
            isMounted.current = true;
        }
    }, [smallLoad]);

    return (
        <>
            <h1 className='heading'> Expenses for the chosen month: ₹ {filter_expense} </h1>
        </>
    );
}
export default FilterExpense;