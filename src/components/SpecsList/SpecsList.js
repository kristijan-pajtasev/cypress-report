import React from 'react';
import './SpecsList.css';

const SpecsList = (props) => {
    const {specs, stats} = props;
    return (
        <ul>
            {specs.map((spec, index) =>
                (<li key={`suite-${index}`} className={stats[spec].fail > 0 ? 'error' : ''}>
                    <div>{spec}</div>
                    <div>Passed: {stats[spec].pass}/{stats[spec].total}</div>
                </li>)
            )}
        </ul>
    )
}

export default SpecsList;