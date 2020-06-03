import React from 'react';
import {Cell, Pie, PieChart} from "recharts";

function PieChartComponent(props) {
    const {data} = props;
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
                    <Cell fill='#00C49F' />
                    <Cell fill='#FF8042' />
                </Pie>
                {/*<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}*/}
                {/*     fill="#82ca9d" label/>*/}
            </PieChart>
        </div>
    )
}

export default PieChartComponent;