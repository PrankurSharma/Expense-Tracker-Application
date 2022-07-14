import React, { useEffect, useRef } from "react";
import Axios from "axios";
import { baseUrl } from "../baseUrl";

function FilterTransactionsComponent({ month, year, smallLoad, updateMoney }) {
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            if (month && year) {
                Axios.post(baseUrl + "/api/filter", {
                    month: month,
                    year: year
                }).then((response) => {
                    updateMoney(response.data);
                });
            }
            else {
                alert("Please fill both the fields in order to proceed.");
            }
        }
        else {
            isMounted.current = true;
        }
    }, [smallLoad]);

    return (
        <></>
    );
}
export default FilterTransactionsComponent;