import React, { useState } from "react";
import Axios from "axios";
import Header from '../Header';
import Spinner from "../Spinner";
import DeleteUpdate from "../InsertDeleteUpdateComponents/DeleteUpdate";
import JSPDFGenerator from "../JSPDFGenerator";
import InsertEntries from '../InsertDeleteUpdateComponents/InsertEntries';
import MonthlyExpense from "../ExpenseComponents/MonthlyExpense";
import MonthlyIncome from "../IncomeComponents/MonthlyIncome";
import MonthlyTransactionsComponent from "../TransactionComponents/MonthlyTransactionsComponent";

function CrudSpeechlyPDF() {
	const [user_id, setuser_id] = useState("");
    const [user_name, setuser_name] = useState("");
	const [monthmoney, setmonth_money] = useState([]);
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
		setmonth_money(newValue);
	}

	function setMoney(newValue) {
		setmonth_money([...monthmoney, newValue]);
	}

	function delsetMoney(newValue) {
		setmonth_money(monthmoney.filter((val) => (val.trans_id !== newValue)));
	}

	function upsetMoney(newValue1, newValue2, newValue3) {
		const newState = monthmoney.map((val) => {
			if(val.trans_id === newValue1) {
				return {...val, Amount: newValue2, Task: newValue3}
			}
			return val;
		});
		setmonth_money(newState);
	}

	function fetchDetails(newValue1, newValue2){
		setuser_id(newValue1);
		setuser_name(newValue2);
	}

	if (loading) {
		return (<Spinner handleChange={handleChange} fetchDetails={fetchDetails} />);
	}
	return (
		<div className="App">
			<Header user_id={user_id} user_name={user_name} handleChange={handleChange}/>
			<div>
				<div className="container">
					<div className="container1">
						<MonthlyIncome monthmoney={monthmoney} smallLoad={smallLoad} />
						<InsertEntries user_id={user_id} handleSmallLoad={handleSmallLoad} setMoney={setMoney}/>
						<MonthlyExpense monthmoney={monthmoney} smallLoad={smallLoad} />
					</div>
				</div>
				<div>
					<h1 className="head"> Transactions This Month </h1>
				</div>
				<MonthlyTransactionsComponent updateMoney={updateMoney} />
				{!monthmoney.length ? <div> <h1 className='head'> No transactions found. </h1> </div> :
					<div className="containertrans">
						<div className="transactions">
							<DeleteUpdate handleSmallLoad={handleSmallLoad} money={monthmoney} delsetMoney={delsetMoney} upsetMoney={upsetMoney} />
						</div>
					</div>}
				<div>
					{!monthmoney.length ? null : <button className="button" onClick={() => {
						genPDFSubmit((called) => !called);
					}}> Generate PDF </button>}
					{pdfcalled && <JSPDFGenerator money={monthmoney} genPDFSubmit={genPDFSubmit} />}
				</div>
			</div>
		</div>
	);
}
export default CrudSpeechlyPDF;