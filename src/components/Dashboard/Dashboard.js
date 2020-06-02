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

    const suites = [pieData, pieData, pieData]

    return (
        <div>

            <div>Dashboard</div>
            <div className='DashboardWidgetContainer'>
                <div className='overallResults'>
                    <PieChart totalTests={stats.tests} data={pieData}/>
                </div>
                <div className='suites'>
                    Suites
                    {/*<ul>*/}
                    {/*    {suites.map((suite, index) =>*/}
                    {/*        (<li key={`suite-${index}`}>*/}
                    {/*            <PieChart totalTests={stats.tests} data={suite}/>*/}
                    {/*        </li>)*/}
                    {/*    )}*/}
                    {/*</ul>*/}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;