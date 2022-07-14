import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { baseUrl } from '../baseUrl';


function Login() {
  Axios.defaults.withCredentials = true;
  const [person_id, setperson_id] = useState("");
  const [password, set_password] = useState("");
  const [loggedin, set_loggedin] = useState(false);

  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');
  }

  const navigateToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    Axios.get(baseUrl + "/api/login").then((response) => {
      if (response.data[0].person_id && response.data[0].username) {
        set_loggedin(true);
      }
    })
  }, []);

  const handleSubmit = () => {
    if (person_id && password) {
      Axios.post(baseUrl + "/api/login", {
        person_id: person_id,
        password: password
      }).then((response) => {
        if (!response.data.message && !response.data.error) {
          navigateToHome();
        }
        else {
          alert(response.data.message);
        }
      });
    }
    else {
      alert("Please fill both the fields in order to proceed.");
    }
  }
  if (loggedin) {
    return (
      <div>
        <h1 className='head'> You are already logged in. Please close the session to continue logging in to another account. Please navigate to: https://finer.netlify.app/ to access your account. </h1>
      </div>
    );
  }
  else {
    return (
      <div className="login-form">
        <Link to='/'>
          <img src="/logo.png" />
        </Link>
        <div>
          <h1>Login</h1>
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
                  set_password(e.target.value);
                }} placeholder="Password" />
            </div>
            <Link to="/forgot" className="link">Forgot Your Password?</Link>
          </div>
          <div className="action">
            <button className='button1' onClick={navigateToSignup}> Register an account </button>
            <button className='button1' onClick={() => {
              handleSubmit();
            }}> Sign in </button>
          </div>
        </div>
      </div>
    );
  }

}

export default Login;