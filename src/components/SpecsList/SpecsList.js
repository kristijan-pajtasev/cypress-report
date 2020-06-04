import React from 'react';
import './SpecsList.css';

const SpecsList = (props) => {
    const {specs, stats} = props;

    const getTestListForSpec = (spec, tests = []) => {
        if(spec.tests && spec.tests.length > 0) tests = [...tests, spec.tests.map(test => ({
            title: test.fullTitle,
            passed: test.passed
        }))]

        const suites = Object.keys(spec).filter(key => !["tests", "pass", "fail", "total", "title", "fullTitle"].includes(key));
        if(suites.length > 0) {
            suites.forEach(suite => {
                const testsForSuite = getTestListForSpec(spec[suite]);
                tests = [...tests, ...testsForSuite];
            })
        }

        return tests.flat();
    }

    return (
        <ul>
            {specs.map((spec, index) =>
                (<li key={`suite-${index}`} className={stats[spec].fail > 0 ? 'error' : ''}>
                    <div>{spec}</div>
                    <div>Passed: {stats[spec].pass}/{stats[spec].total}</div>
                    <div>
                        {JSON.stringify(getTestListForSpec(stats[spec]))}
                    </div>
                </li>)
            )}
        </ul>
    )
}

export default SpecsList;