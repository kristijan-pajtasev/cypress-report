import React from 'react';
import {Pie, PieChart} from "recharts";

function PieChartComponent() {
    const data01 = [
        { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    ];
    return (
        <div>
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8"/>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}
                     fill="#82ca9d" label/>
            </PieChart>
        </div>
    )
}

export default PieChartComponent;