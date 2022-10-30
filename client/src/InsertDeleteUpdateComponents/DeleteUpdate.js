import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';
function DeleteUpdate({ money, handleSmallLoad, delsetMoney, upsetMoney }) {
    const [new_amount, setnew_amount] = useState("");
    const [new_task, setnew_task] = useState("");
    const [isdeleted, set_isdeleted] = useState(false);
    const [isupdated, set_isupdated] = useState(false);
    const [deltransid, set_deltransid] = useState("");
    const [uptransid, set_uptransid] = useState("");

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const logout = () => {
        Axios.get(baseUrl + "/api/logout").then((response) => {
            navigateToLogin();
        });
    }

    const deleteTransaction = (trans_id) => {
        set_deltransid(trans_id);
        Axios.delete(baseUrl + `/api/delete/${trans_id}`).then((response) => {
            if(response.data.message){
                logout();
            }
            else{
                alert("Transaction deleted successfully.");
                set_isdeleted((val) => !val);
                handleSmallLoad((loading) => !loading);
            }
        });
    };

    useEffect(() => {
        delsetMoney(deltransid);
    }, [isdeleted]);

    const updateTransaction = (trans_id) => {
        set_uptransid(trans_id);
        if (new_amount && new_task) {
            Axios.put(baseUrl + "/api/update", {
                trans_id: trans_id,
                amount: new_amount,
                task: new_task
            }).then((response) =>{
                if(response.data.message){
                    logout();
                }
                else{
                    alert("Transaction updated successfully.");
                    set_isupdated((val) => !val);
                    handleSmallLoad((loading) => !loading);
                    setnew_amount("");
                    setnew_task("");
                }
            });
        }
        else {
            alert("Please fill both the values in order to update the transaction.");
        }
    };

    useEffect(() => {
        upsetMoney(uptransid, new_amount, new_task);
    }, [isupdated]);

    return (
        <>
            {money.map((val) => {
                return (
                    <div className="maincard">
                        <h1 className="heading"> {val.Task} </h1>
                        <h2 className="heading"> ID: {val.trans_id} </h2>
                        <h3 className="heading"> Amount: ₹ {val.Amount} <span> Type: {val.Type} </span> </h3>
                        <h4 className="heading"> Date: {val.added_date} </h4>
                        <button className="delete" onClick={() => {
                            deleteTransaction(val.trans_id);
                        }}> Delete </button>
                        <div className="smallcard">
                            <h4 className="heading"> New Task:
                                <input type="text" id="updateInput" value={new_task} onChange={(e) => {
                                    setnew_task(e.target.value)
                                }} />
                            </h4>
                            <h4 className="heading">New Amount: 
                                <input type="text" id="updateInput1" value={new_amount} onChange={(e) => {
                                    setnew_amount(e.target.value)
                                }} />
                            </h4>
                            <button className="update" onClick={() => {
                                updateTransaction(val.trans_id);
                            }}> Update </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
export default DeleteUpdate;