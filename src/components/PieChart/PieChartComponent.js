import React from 'react';
import {Cell, Legend, Pie, PieChart} from "recharts";

const RADIAN = Math.PI / 180;

function PieChartComponent(props) {
    const {data} = props;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderLegend = (props) => {
        const { payload } = props;

        return (
            <ul>
                {
                    payload.map((entry, index) => (
                        <li key={`item-${index}`}>{entry.value}</li>
                    ))
                }
            </ul>
        );
    }

    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8"
                     labelLine={false} label={renderCustomizedLabel}>
                    <Cell fill='#00C49F'/>
                    <Cell fill='#FF8042'/>


                </Pie>
                {/*<Legend content={renderLegend} />*/}
                {/*<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}*/}
                {/*     fill="#82ca9d" label/>*/}
                {/*<Legend content={renderLegend} />*/}
                <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
            {/*<Legend verticalAlign="bottom" height={36}/>*/}
            {/*<Legend content={renderLegend} />*/}
        </div>
    )
}

export default PieChartComponent;