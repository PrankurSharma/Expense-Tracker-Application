import React from "react";
import './App.css';
import CrudSpeechlyPDF from "./MainApplicationComponents/CrudSpeechlyPDF";
import Login from './LoginSignupForgotComponents/Login';
import Signup from './LoginSignupForgotComponents/Signup';
import Forgot from './LoginSignupForgotComponents/Forgot';
import AllTransactions from './MainApplicationComponents/AllTransactions';
import FilterTransactions from './MainApplicationComponents/FilterTransactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<CrudSpeechlyPDF />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/changepassword" element={<Forgot />} />
				<Route exact path="/alltransactions" element={<AllTransactions />} />
				<Route exact path="/filtertransactions" element={<FilterTransactions />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;