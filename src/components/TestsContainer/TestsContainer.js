import React from 'react';
import './TestsContainer.css';
import TestList from "../TestList";

const TestsContainer = (props) => {
    const {specs, stats} = props;

    return (
        <div className="TestsContainer">
            <TestList spec={stats[specs[0]]} specName={specs[0]}/>
            <TestList spec={stats[specs[1]]} specName={specs[1]}/>
        </div>
    )

}

export default TestsContainer;