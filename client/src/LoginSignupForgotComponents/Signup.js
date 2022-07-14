import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';


function Signup() {
  Axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };

  const [username, setuser_name] = useState("");
  const [password, set_password] = useState("");
  const person_id = uuid().slice(0, 7);
  const handleSubmit = async () => {
    if (username && password) {
      Axios.post(baseUrl + "/api/signup", {
        person_id: person_id,
        username: username,
        password: password
      });
      alert("Your personal id is: " + person_id + ". Please keep it safely as it will be used for all the future logins.");
      navigateToLogin();
    }
    else {
      alert("Please fill both the fields in order to proceed.");
    }
  }

  return (
    <div className="login-form">
      <Link to='/'>
        <img src="/logo.png" />
      </Link>
      <div>
        <h1> Signup </h1>
        <div className="content">
          <div className="input-field">
            <input type="text"
              name="username"
              onChange={(e) => {
                setuser_name(e.target.value);
              }} placeholder="Username(Can be your name or email)" />
          </div>
          <div className="input-field">
            <input type="password"
              name="password"
              onChange={(e) => {
                set_password(e.target.value);
              }} placeholder="Password" />
          </div>
        </div>
        <div className="action">
          <button onClick={navigateToLogin}> Already signed up? Login </button>
          <button onClick={() => {
            handleSubmit();
          }}> Register </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;