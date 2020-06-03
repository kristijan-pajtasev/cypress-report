import React from 'react';
import PieChart from '../PieChart'
import './Dashboard.css';

function Dashboard(props) {
    const {data} = props;
    const stats = data;

    const pieData = [
        {name: "Pass", value: stats.pass},
        {name: "Fail", value: stats.fail}
    ]

    const specs = Object.keys(stats).filter(e => !["tests", "pass", "fail"].includes(e));

    return (
        <div>

            <div>Dashboard</div>
            <div className='DashboardWidgetContainer'>
                <div className='overallResults'>
                    <div>{stats.pass} / {stats.pass + stats.fail}</div>
                    <PieChart totalTests={stats.tests} data={pieData}/>
                </div>
                <div className='suites'>
                    <div>Specs:</div>
                    <ul>
                        {specs.map((spec, index) =>
                            (<li key={`suite-${index}`} className={stats[spec].fail > 0 ? 'error' : ''}>
                                <div>{spec}</div>
                                <div>Passed: {stats[spec].pass}/{stats[spec].total}</div>
                                {/*<PieChart totalTests={stats.tests} data={suite}/>*/}
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;