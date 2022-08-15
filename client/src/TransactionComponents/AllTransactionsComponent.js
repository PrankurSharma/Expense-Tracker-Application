import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';
import LoadingBars from '../LoadingBars';

function AllTransactionsComponent({ smallLoad, updateMoney, fetchData, fetched }) {
    useEffect(() => {
        Axios.get(baseUrl + "/api/get").then((response) => {
            updateMoney(response.data);
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
            <></>
        );
    }
}
export default AllTransactionsComponent;