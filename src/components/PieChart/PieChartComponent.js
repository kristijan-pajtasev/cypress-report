import React, {useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart} from "recharts";
import './PieChart.css'

const RADIAN = Math.PI / 180;

function PieChartComponent(props) {
    const {data} = props;
    const id = `PieChart_${Math.random() * Date.now()}`

    const [size, setSize] = useState({height: 0, width: 0})

    const renderCustomizedLabel = function ({cx, cy, midAngle, innerRadius, outerRadius, value, percent}) {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) / 3;
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"
                  fontSize={25}>
                {`${(percent * 100).toFixed(0)}% (${value})`}
            </text>
        );
    };

    useEffect(() => {
        const dimensions = document.getElementById(id).getBoundingClientRect()
        setSize({
            width: dimensions.width,
            height: dimensions.height
        })
    }, [])

    const radius = Math.min(size.height, size.width) / 2 - 40;

    const getPassValue = () => {
        const passValue = data.find(e => e.name === 'Pass').value;
        const percentage = (passValue / (data[0].value + data[1].value) * 100).toFixed(2) ;
        return `${percentage}%  (${passValue})`
    }
    const getFailValue = () => {
        const passValue = data.find(e => e.name === 'Fail').value;
        const percentage = (passValue / (data[0].value + data[1].value) * 100).toFixed(2) ;
        return `${percentage}% (${passValue})`
    }

    return (
        <div className='PieChartComponent'>
            <div className='PieChartComponentStats'>
                <div>{getPassValue()}</div>
                <div>{getFailValue()}</div>
            </div>
            <div className='PieChartContainer' id={id}>
                <PieChart width={size.width} height={size.height}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={radius} fill="#8884d8"
                         labelLine={false} >
                        <Cell fill='#81C784'/>
                        <Cell fill='#FF8A65'/>
                    </Pie>
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </div>
        </div>
    )
}

export default PieChartComponent;