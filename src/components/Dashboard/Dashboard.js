import React from 'react';
import PieChart from '../PieChart'

function Dashboard(props) {
    const {data} = props;

    const pieData = [{name:"Pass", value: 2},
    {name:"Fail", value: 1}]


    return (
        <div>

            <div>Dashboard</div>
            <div>
                <PieChart data={pieData}/>
            </div>
        </div>
    )
}

export default Dashboard;