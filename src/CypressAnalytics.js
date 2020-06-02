import React from 'react';
import Dashboard from "./components/Dashboard";
import './CypressAnalytics.css';
import data from './results.json'

function CypressAnalytics() {
  return (
    <div className="CypressAnalytics">
      <div>Cypress analytics</div>
        <Dashboard data={data} />
    </div>
  );
}

export default CypressAnalytics;
