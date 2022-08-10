import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SpeechProvider } from '@speechly/react-client';
ReactDOM.render(
    <SpeechProvider appId="85f4a8c7-b6b1-418d-87a9-60f62c5705ba" language="en-US">
        <App />
    </SpeechProvider>
    , document.getElementById('root'));


