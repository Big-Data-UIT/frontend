import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, Typography, Container, Grid, TextField } from '@material-ui/core';
import { Movie } from '../model/Movie';
import { getApiClient } from "../client/client"
import { io } from "socket.io-client"
import { TextFields } from '@material-ui/icons';
import LineChartComponent from '../components/LineChartComponent';

import { Rating } from '../model/Rating';
import BarChartComponent from '../components/BarChartComponent';
let endPoint = "http://localhost:5555/kafka";
let socket = io(`${endPoint}`);
export default function Chart() {
    const [messages, setMessages] = useState<string[]>([]);
    const [sendMsg, setSendMsg] = useState<string>("");
    const [data, setData] = useState<Rating[]>([]);

    const apiClient = getApiClient(null);
    useEffect(() => {
        getMessages();
    }, [messages.length])

    useEffect(() => {
        apiClient.getRatings(10).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data);
            }
        });

    }, [])
    const getMessages = () => {
        socket.on("message", msg => {
            setMessages([...messages, msg]);
        })
    }
    const onChange = (e: any) => {
        setSendMsg(e.target.value);
    }
    const onClick = () => {
        let rating = {
            user: 999,
            movieId: 1,
            rating: 4.0
        }
        socket.emit("message", rating)
        setSendMsg("");
    }
    return (
        <React.Fragment>
            {
                messages.length > 0 ?
                    messages.map((msg) => { return <Typography>{msg}</Typography> })
                    : null
            }
            <TextField
                placeholder="Type something"
                value={sendMsg}
                onChange={onChange}
            />
            <Button
                onClick={onClick}
            >Send Msg</Button>
            {data.length > 0 ?
                <BarChartComponent dataKey={"rating"} data={data} tick={"movieId"} label={"userId"} /> : null}
        </React.Fragment>
    )
}