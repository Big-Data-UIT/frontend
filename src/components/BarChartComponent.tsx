
import React, { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { Movie } from "../model/Movie";
import { Rating } from "../model/Rating"
interface LineChartProps {
    data: Rating[],
    dataKey: string,
    tick: string,
    label: string,
}
export default function BarChartComponent(props: LineChartProps) {
    const { data, dataKey, tick, label } = props;
    const [displayData, setDisplayData] = useState<any>([])
    useEffect(() => {
        let displayData = data;
        console.log(props);
        displayData.forEach((item: any) => item[dataKey] = parseInt(item[dataKey]));
        console.log(displayData)
        setDisplayData(displayData);
    }, [])
    return (
        <BarChart width={600} height={300} data={displayData}>
            <XAxis dataKey={label} tick={{ stroke: '8884d8', strokeWidth: 0.5 }} />
            <YAxis />
            <Bar dataKey={dataKey} barSize={30} fill="#8884d8"
                label={<span>{label}</span>} />
        </BarChart>
    )

}