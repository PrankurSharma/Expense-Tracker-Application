import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from '../Header';
import Spinner from '../Spinner';
import JSPDFGenerator from '../JSPDFGenerator';
import DeleteUpdate from '../InsertDeleteUpdateComponents/DeleteUpdate';
import FilterIncome from '../IncomeComponents/FilterIncome';
import FilterExpense from '../ExpenseComponents/FilterExpense';
import FilterTransactionsComponent from '../TransactionComponents/FilterTransactionsComponent';

function FilterTransactions() {
    const [user_id, setuser_id] = useState("");
    const [user_name, setuser_name] = useState("");
    const [month, set_month] = useState("month");
    const [year, set_year] = useState("year");
    const [money, set_money] = useState([]);
    const [loading, setLoading] = useState(true);
    const [smallLoad, setSmallLoad] = useState(true);
    const [pdfcalled, setPdfCalled] = useState(false);
    Axios.defaults.withCredentials = true;

    function handleChange(newValue) {
        setLoading(newValue);
    }

    function handleSmallLoad(newValue) {
        setSmallLoad(newValue);
    }

    function genPDFSubmit(newValue) {
        setPdfCalled(newValue);
    }

    function updateMoney(newValue) {
        set_money(newValue);
    }

    function fetchDetails(newValue1, newValue2){
		setuser_id(newValue1);
		setuser_name(newValue2);
	}

    let maxOffset = 60;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) });

    const navigate = useNavigate();

    const navigateToAllTrans = () => {
        navigate('/alltransactions');
    };

    if (loading) {
        return (<Spinner handleChange={handleChange} fetchDetails={fetchDetails}/>);
    }
    else {
        return (
            <div className='App'>
                <Header user_id={user_id} user_name={user_name} />
                <h1 className='head'> Filter Transactions </h1>
                <div>
                    <select id="month" name="month" onChange={(e) => {
                        set_month(e.target.value);
                    }}>
                        <option>month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select id="year" name="year" onChange={(e) => {
                        set_year(e.target.value);
                    }}>
                        <option>year</option>
                        {yearList}
                    </select>
                    <button className='button' onClick={() => {
                        handleSmallLoad((loading) => !loading);
                    }}> Filter Results </button>
                </div>
                <div className="filtertransactions">
                    <FilterIncome smallLoad={smallLoad} month={month} year={year} />
                    <FilterExpense smallLoad={smallLoad} month={month} year={year} />
                    <div>
                        <h1 className='head'> Transaction Results </h1>
                    </div>
                    <FilterTransactionsComponent month={month} year={year} smallLoad={smallLoad} updateMoney={updateMoney} />
                    {!money.length ? <div> <h1 className='head'> No transactions found. </h1> </div> :
                        <div className='containertrans'>
                            <div className='alltransactions'>
                                <DeleteUpdate money={money} handleSmallLoad={handleSmallLoad} />
                            </div>
                        </div>}
                </div>
                <div>
                    {!money.length ? null : <button className="button" onClick={() => {
                        genPDFSubmit((called) => !called);
                    }}> Generate PDF </button>}
                    {pdfcalled && <JSPDFGenerator money={money} genPDFSubmit={genPDFSubmit} />}
                    <button className='button' onClick={navigateToAllTrans}> View All Transactions </button>
                </div>
            </div>
        );
    }
}
export default FilterTransactions;