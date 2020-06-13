import React, {useState, useEffect} from 'react';
import Dashboard from "./components/Dashboard";
import './CypressAnalytics.css';

const reload = time => {
    setTimeout(() => {
        window.location.reload()
    }, time);
}

function CypressAnalytics() {
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch('results.json').then(res => {
            res.json().then(setData)
        })
        fetch('config.json').then(res => {
            res.json().then(c => {
                if(c.refreshDelay) reload(c.refreshDelay)
                setConfig(c)
            })
        })
    }, [])

    console.log(config)

    return (
        <div className="CypressAnalytics">
            {(data && config) ? <Dashboard config={config} data={data}/> : <></>}
        </div>
    );
}

export default CypressAnalytics;
