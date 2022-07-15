import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from '../Header';
import Spinner from "../Spinner";
import DeleteUpdate from '../InsertDeleteUpdateComponents/DeleteUpdate';
import JSPDFGenerator from '../JSPDFGenerator';
import TotalIncome from '../IncomeComponents/TotalIncome';
import TotalExpense from '../ExpenseComponents/TotalExpense';
import AllTransactionsComponent from '../TransactionComponents/AllTransactionsComponent';

function AllTransactions() {
	const [user_id, setuser_id] = useState("");
    const [user_name, setuser_name] = useState("");
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

	const navigate = useNavigate();

	const navigateToFilterTrans = () => {
		navigate('/filtertransactions');
	}

	if (loading) {
		return (<Spinner handleChange={handleChange} fetchDetails={fetchDetails} />);
	}
	else {
		return (
			<div className='App'>
				<Header user_id={user_id} user_name={user_name} />
				<h1 className='head'> All Transactions </h1>
				<TotalIncome smallLoad={smallLoad} />
				<TotalExpense smallLoad={smallLoad} />
				<div>
					<h1 className='head'> Transaction Results </h1>
				</div>
				<AllTransactionsComponent smallLoad={smallLoad} updateMoney={updateMoney} />
				{!money.length ? <div> <h1 className='head'> No transactions found. </h1> </div> :
					<div className="containertrans">
						<div className="alltransactions">
							<DeleteUpdate money={money} handleSmallLoad={handleSmallLoad} />
						</div>
					</div>}
				<div>
					{!money.length ? null : <button className="button" onClick={() => {
						genPDFSubmit((called) => !called);
					}}> Generate PDF For All Transactions </button>}
					{pdfcalled && <JSPDFGenerator money={money} genPDFSubmit={genPDFSubmit} />}
					<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
				</div>
			</div>
		);
	}
}
export default AllTransactions;