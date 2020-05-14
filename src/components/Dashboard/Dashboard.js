import React from 'react';
import PieChart from '../PieChart'

function Dashboard(props) {
    const {data} = props;
    const {stats} = data;

    const pieData = [
        {name: "Pass", value: stats.passes},
        {name: "Fail", value: stats.failures}
    ]

    const suites = [pieData, pieData, pieData]

    return (
        <div>

            <div>Dashboard</div>
            <div>
                <PieChart totalTests={stats.tests} data={pieData}/>
            </div>
            <div>
                Suites
                <ul>
                    {suites.map((suite, index) =>
                        (<li key={`suite-${index}`}>
                            <PieChart totalTests={stats.tests} data={suite}/>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;