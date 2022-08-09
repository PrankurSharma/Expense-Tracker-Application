import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';

function Forgot() {

  const [person_id, setperson_id] = useState("");
  const [newpassword, setnew_password] = useState("");

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    if (person_id && newpassword) {
      Axios.put(baseUrl + "/api/forgot", {
        person_id: person_id,
        newpassword: newpassword
      }).then((response) => {
        if (!response.data.message) {
          alert("Password updated successfully.");
          navigateToMain();
        }
        else {
          alert(response.data.message);
        }
      }).catch((err) => {
        alert(err);
      });
    }
    else {
      alert("Please fill both the fields in order to proceed.");
    }
    setperson_id("");
    setnew_password("");
  }

  return (
    <div className="login-form">
      <Link to='/'>
        <img src="/logo.png" />
      </Link>
      <div>
        <h1> Change Password </h1>
        <div className='warn'>
          <h6> Note: After changing the password, you will get logged out of your account if already logged in. </h6>
        </div>
        <div className="content">
          <div className="input-field">
            <input type="text"
              name="ID"
              onChange={(e) => {
                setperson_id(e.target.value);
              }} placeholder="Personal ID" />
          </div>
          <div className="input-field">
            <input type="password"
              name="password"
              onChange={(e) => {
                setnew_password(e.target.value);
              }} placeholder="New Password" />
          </div>
        </div>
        <div className="action">
          <button className='button' onClick={() => {
            handleSubmit();
          }}> Submit </button>
        </div>
      </div>
    </div>
  );
}

export default Forgot;