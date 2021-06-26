import { Container, GridList, GridListTile, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ApiClient, getApiClient } from "../client/client";
import LineChartComponent from '../components/LineChartComponent';
import PaginationComponent from '../components/PaginationComponent';
import SingleContent from '../components/SingleContent/SingleContent';
import { Movie } from "../model/Movie";
import { io } from "socket.io-client"
import Toast from '../components/Toast';


const useStyles = makeStyles((theme) => ({
    homePage: {
        paddingTop: '30px'
    },
    movies: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}));

export default function Home() {
    const classes = useStyles();
    let endPoint = "http://localhost:5555/kafka";
    let socket = io(`${endPoint}`);
    const apiClient: ApiClient = getApiClient({ userId: 9999 });
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [offset, setOffSet] = useState(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [success, setSuccess] = useState(false);
    const limit = 12;
    useEffect(() => {
        console.log('here');
        apiClient.getMovieListUnRate(offset, limit, '999').then((response) => {
            if (response.status === 200) {
                setMovieList(response.data);
                setTotalPage(Math.round(response.total / limit));
                console.log(response.data);
            }
        });
    }, [page, limit, setTotalPage]);


    const handleRate = (movieId: string, rate: number) => {
        let rating = { "movieId": movieId, "rating": rate, "userId": "999" }
        socket.emit("message", rating)
        // apiClient.postMovieRating(movieId, rate, '999').then((response) => {
        //     if (response.status === 200) {
        //         setSuccess(true);
        //     }
        // });
    }
    const handlePageChange = (value: any) => {
        let newOffSet = (value == 1) ? 1 : (value - 1) * limit + 1;
        setPage(value);
        setOffSet(newOffSet);
    }
    const handleSuccessAfterCloseToast = () => setSuccess(false);
    return (
        <div className={classes.homePage}>
            {success ? <Toast isOpen={true} text='Rating Success' type='success' handleSuccess={handleSuccessAfterCloseToast} /> : <></>}
            <Typography variant="h4" className="pageTitle" > Movie List UnRated </Typography>
            <div className={classes.movies}>
                {movieList?.map((movie) => (
                    <SingleContent
                        movie={movie}
                        onRate={handleRate}
                    />
                ))}
            </div>
            <PaginationComponent total={totalPage} page={page} onClickPageChange={handlePageChange} />
        </div>
    )
}