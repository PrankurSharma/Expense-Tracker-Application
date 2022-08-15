import React from 'react';
import ReactLoading from 'react-loading';
function LoadingBars(){
    return (
        <div className="loading-bars">
            <ReactLoading type="bars" color="rgba(138, 43, 226)" />
        </div>
    );
}

export default LoadingBars;