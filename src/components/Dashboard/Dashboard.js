import React from 'react';
import PieChart from '../PieChart'
import SpecsList from '../SpecsList'
import './Dashboard.css';
import TestsContainer from "../TestsContainer";
import AutoScroll from "../AutoScroll";

function Dashboard(props) {
    const {data, config} = props;
    const stats = data;

    const pieData = [
        {name: "Pass", value: stats.pass || 0},
        {name: "Fail", value: stats.fail || 0}
    ]

    const specs = Object.keys(stats).filter(e => !["tests", "pass", "fail"].includes(e));

    const getDateInFormat = timestamp => {
        const date = new Date();
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    }

    return (
        <div>
            <div className='DashboardWidgetContainer'>
                <div className='DashboardWidgetContainerRow DashboardTitleContainer'>
                    <div className='DashboardTitle'>
                        {config.title} - last run: {getDateInFormat(config.lastRun)}
                    </div>
                </div>
                <div className='DashboardWidgetContainerRow'>
                    <div className='overallResults'>
                        <PieChart totalTests={stats.tests} data={pieData}/>
                    </div>
                    <div className='suites'>
                        <AutoScroll data={stats}>
                            <SpecsList stats={stats} specs={specs}/>
                        </AutoScroll>
                    </div>
                </div>
                <div className='DashboardWidgetContainerRow'>
                    <TestsContainer stats={stats} specs={specs}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;