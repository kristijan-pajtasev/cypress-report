import React, {useState} from 'react';
import './TestsContainer.css';
import TestList from "../TestList";

const TestsContainer = (props) => {
    const {specs, stats} = props;
    const numOfElements = specs.length;
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(1);

    const showNextSpec = (setFunction) => {
        const nextIndex = (Math.max(firstIndex, secondIndex) + 1) % numOfElements;
        setFunction(nextIndex);
    }

    return (
        <div className="TestsContainer">
            {numOfElements > 0 && <TestList onEnd={showNextSpec.bind(null, setFirstIndex)} spec={stats[specs[firstIndex]]} specName={specs[firstIndex]}/>}
            {numOfElements > 1 && <TestList onEnd={showNextSpec.bind(null, setSecondIndex)} spec={stats[specs[secondIndex]]} specName={specs[secondIndex]}/>}
        </div>
    )

}

export default TestsContainer;