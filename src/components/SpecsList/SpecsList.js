import React, {useEffect} from 'react';
import './SpecsList.css';

const startScroll = (maxAmount, selector) => {
    const element = document.querySelector(selector);
    let currentScrollOffset = 0;
    const scroll = (currentAmount) => {
        setTimeout(() => {
            // element.scroll(0, currentAmount);
            // const nextAmount = currentAmount + 10;
            // if(nextAmount > maxAmount) scroll(0)
            // else scroll(nextAmount)
        }, 100)
    }

    scroll(currentScrollOffset);
}

const SpecsList = (props) => {
    const {specs, stats} = props;

    const getTestListForSpec = (spec, tests = []) => {
        if (spec.tests && spec.tests.length > 0) tests = [...tests, spec.tests.map(test => ({
            title: test.fullTitle,
            passed: test.passed
        }))]

        const suites = Object.keys(spec).filter(key => !["tests", "pass", "fail", "total", "title", "fullTitle"].includes(key));
        if (suites.length > 0) {
            suites.forEach(suite => {
                const testsForSuite = getTestListForSpec(spec[suite]);
                tests = [...tests, ...testsForSuite];
            })
        }

        return tests.flat();
    }

    useEffect(() => {

        const containerHeight = document.querySelector(".suites").clientHeight;
        const listHeight = document.querySelector(".SpecsList").clientHeight
        const totalScrollDistance = containerHeight - listHeight;
        startScroll(totalScrollDistance, ".SpecsList")
        // if(listHeight > )
    }, [])

    return (
        <ul className='SpecsList'>
            {specs.map((spec, index) =>
                    (<li key={`suite-${index}`}
                         className={['SpecsList__Spec', stats[spec].fail > 0 ? 'error' : ''].join(" ")}>
                        <div className={'SpecsList__Spec__Header'}>
                            <div>{spec}</div>
                            <div>Passed: {stats[spec].pass}/{stats[spec].total}</div>
                        </div>
                        {/*<ul className='SpecsList__Spec__TestList'>*/}
                        {/*    {getTestListForSpec(stats[spec]).map(*/}
                        {/*        test => (*/}
                        {/*            <li key={`suite-${index}-${test.title}`} className={['SpecsList__Spec__TestList__Test', test.passed ? '' : 'error'].join(" ")}>*/}
                        {/*            <span className={["material-icons", test.passed ? '' : 'error'].join(' ')}>*/}
                        {/*                {test.passed ? 'check' : 'close'}*/}
                        {/*                </span>{test.title}*/}
                        {/*            </li>)*/}
                        {/*    )}*/}
                        {/*</ul>*/}
                    </li>)
            )}
        </ul>
    )
}

export default SpecsList;