import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function AllTransactionsComponent({ smallLoad, updateMoney }) {
    useEffect(() => {
        Axios.get(baseUrl + "/api/get").then((response) => {
            updateMoney(response.data);
        });
    }, [smallLoad]);

    return (
        <></>
    );
}
export default AllTransactionsComponent;