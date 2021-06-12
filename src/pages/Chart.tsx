import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, Typography, Container, Grid } from '@material-ui/core';
import { Movie } from '../model/Movie';
import { getApiClient } from "../client/client"

export default function Chart() {
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const apiClient = getApiClient();
    useEffect(() => {
        apiClient.getMoviesChart("asc").then((response) => {
            console.log(response);
            if (response.status === "OK") {
                setMovieList(response.data);
            }
        })
    }, [])

    return (
        <Container>
            {movieList?.map((movie: Movie) => {
                <Typography>{movie.title}</Typography>
            })}
            {"Hello Chart"}
        </Container>
    );
}