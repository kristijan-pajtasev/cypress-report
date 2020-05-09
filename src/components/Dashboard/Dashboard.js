import React from 'react';
import PieChart from '../PieChart'

function Dashboard(props) {
    const {data} = props;
    const {stats} = data;

    const pieData = [
        {name:"Pass", value: stats.passes},
        {name:"Fail", value: stats.failures}
    ]


    return (
        <div>

            <div>Dashboard</div>
            <div>
                <PieChart totalTests={stats.tests} data={pieData}/>
            </div>
        </div>
    )
}

export default Dashboard;