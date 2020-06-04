import React, {useState, useEffect} from 'react';
import Dashboard from "./components/Dashboard";
import './CypressAnalytics.css';

function CypressAnalytics() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/results.json').then(res => {
            res.json().then(setData)
        })
    }, [])
    return (
        <div className="CypressAnalytics">
            {data ? <Dashboard data={data}/> : <></>}
        </div>
    );
}

export default CypressAnalytics;
