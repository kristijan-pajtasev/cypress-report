import React, {useState} from 'react';
import './TestsContainer.css';
import TestList from "../TestList";

const TestsContainer = (props) => {
    const {specs, stats} = props;
    const numOfElements = specs.length;
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(1);

    const showNextSpec = (setIndex) => {
        if(setIndex === "FIRST") setFirstIndex((firstIndex + 2) % numOfElements);
        else setSecondIndex((secondIndex + 2) % numOfElements);
    }

    const firstSpecName = specs[firstIndex];
    const secondSpecName = specs[secondIndex];

    return (
        <div className="TestsContainer">
            {numOfElements > 0 && <TestList spec={stats[firstSpecName]} specName={firstSpecName}/>}
            {numOfElements > 1 && <TestList onEnd={showNextSpec.bind(null, "SECOND")} spec={stats[secondSpecName]} specName={secondSpecName}/>}
        </div>
    )

}

export default TestsContainer;