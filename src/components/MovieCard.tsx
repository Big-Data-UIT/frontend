import { Grid, Container, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Movie } from "../model/Movie"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
// import StarOutlineIcon from '@material-ui/icons/StarOutline';
interface Props {
    movie: Movie,
    onRate: Function,
}
export default function MovieCard(props: Props) {
    const { movie, onRate } = props;
    const starArr = new Array<number>(5).fill(0);
    const handleRate = (i: number) => {
        onRate(movie.movieId, i);
    }

    return (
        <Card>
            <CardMedia
                component="img"
                image={movie?.Poster}
                alt={movie?.title}
                height={300}
                style={{
                    objectFit: 'fill',
                }}
                title={movie.title}
            />
            <CardContent>
                <Grid container direction="column">
                    <Typography variant="h6">
                        {movie.title}
                    </Typography>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container direction="row">
                    {
                        starArr.map((item, idx) => {
                            return (
                                <IconButton
                                    onClick={() => { handleRate(idx) }}>
                                    <StarBorderIcon />
                                </IconButton>
                            )
                        })
                    }
                </Grid>
            </CardActions>
        </Card >
    )
}