import React, { useEffect } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function MonthlyTransactionsComponent({ smallLoad, updateMoney }) {
    useEffect(() => {
        Axios.get(baseUrl + "/api/getmonthtrans").then((response) => {
            updateMoney(response.data);
        });
    }, [smallLoad]);
    return (
        <></>
    );
}
export default MonthlyTransactionsComponent;