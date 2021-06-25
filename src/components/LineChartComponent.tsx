
import React, { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Movie } from "../model/Movie";
import { Rating } from "../model/Rating"
interface LineChartProps {
    data: Rating[],
}
export default function LineChartComponent(props: LineChartProps) {
    const { data } = props;

    return (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    )

}