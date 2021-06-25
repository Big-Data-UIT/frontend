import { Grid, Container, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { ApiClient, getApiClient } from "../client/client";
import LineChartComponent from '../components/LineChartComponent';
import MovieCard from '../components/MovieCard';
import { Movie } from "../model/Movie"

export default function Home() {
    const apiClient: ApiClient = getApiClient({ userId: 9999 });
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        apiClient.getMovieList(10).then((response) => {
            if (response.status === "OK") {
                setMovieList(response.data);
            }
        });
    }, [])

    const handleRate = (movieId: string, rate: number) => {
        console.log(movieId, rate);
        apiClient.postMovieRating(movieId, rate);
    }
    return (
        <Container
            style={{
                backgroundColor: "lavender"
            }}
            fixed>
            <Grid
                style={{
                    backgroundColor: "greenyellow"
                }}
                container
                justify="flex-start"
                alignItems="center"
                spacing={3}
                direction="row" >
                {
                    movieList?.map((movie) => {
                        return (
                            <Grid item xs={3}>
                                <MovieCard movie={movie} onRate={handleRate} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}