import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

	const navigate = useNavigate();

	const navigateToAllTrans = () => {
		navigate('/alltransactions');
	};

	const navigateToFilterTrans = () => {
		navigate('/filtertransactions');
	}

	if (loading) {
		return (<Spinner handleChange={handleChange} />);
	}
	return (
		<div className="App">
			<div className="bg"> </div>
			<Header />
			<div className="container">
				<div className="container1">
					<MonthlyIncome monthmoney={monthmoney} smallLoad={smallLoad} />
					<InsertEntries handleSmallLoad={handleSmallLoad} />
					<MonthlyExpense monthmoney={monthmoney} smallLoad={smallLoad} />
				</div>
			</div>
			<div>
				<h1 className="head"> Transactions This Month </h1>
			</div>
			<MonthlyTransactionsComponent smallLoad={smallLoad} updateMoney={updateMoney} />
			{!monthmoney.length ? <div> <h1 className='head'> No transactions found. </h1> </div> :
				<div className="containertrans">
					<div className="transactions">
						<DeleteUpdate handleSmallLoad={handleSmallLoad} money={monthmoney} />
					</div>
				</div>}
			<div>
				{!monthmoney.length ? null : <button className="button" onClick={() => {
					genPDFSubmit((called) => !called);
				}}> Generate PDF </button>}
				{pdfcalled && <JSPDFGenerator money={monthmoney} genPDFSubmit={genPDFSubmit} />}
				<button className="button" onClick={navigateToAllTrans}> View All Transactions </button>
				<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
			</div>
		</div>
	);
}
export default CrudSpeechlyPDF;