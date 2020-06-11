import React, {useState} from 'react';
import './TestsContainer.css';
import TestList from "../TestList";

const TestsContainer = (props) => {
    const {specs, stats} = props;
    const numOfElements = specs.length;
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(1);
    return (
        <div className="TestsContainer">
            {numOfElements > 0 && <TestList spec={stats[specs[firstIndex]]} specName={specs[firstIndex]}/>}
            {numOfElements > 1 && <TestList spec={stats[specs[secondIndex]]} specName={specs[secondIndex]}/>}
        </div>
    )

}

export default TestsContainer;