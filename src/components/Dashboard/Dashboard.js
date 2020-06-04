import React from 'react';
import PieChart from '../PieChart'
import SpecsList from '../SpecsList'
import './Dashboard.css';
import TestsContainer from "../TestsContainer";

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
            <div className='DashboardWidgetContainer'>
                <div className='DashboardWidgetContainerRow'>
                    <div className='overallResults'>
                        <PieChart totalTests={stats.tests} data={pieData}/>
                    </div>
                    <div className='suites'>
                        <SpecsList stats={stats} specs={specs}/>
                    </div>
                </div>
                <div className='DashboardWidgetContainerRow'>
                    <TestsContainer stats={stats} specs={specs} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;