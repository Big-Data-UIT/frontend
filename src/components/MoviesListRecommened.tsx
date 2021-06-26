import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ApiClient, getApiClient } from '../client/client';
import { Typography} from '@material-ui/core'
import Gallery from '../components/Carousel/Carousel'
import { Movie } from "../model/Movie";

const useStyles = makeStyles((theme) => ({
    RecommendPage: {
        paddingTop: '30px'
    }
  }));

const MoviesListRecommened = () => {
    const classes = useStyles();
    const apiClient: ApiClient = getApiClient({ userId: 1 });
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        apiClient.getMovieListRecommend('1').then((response) => {
            if (response.status === 200) {
                setMovieList(response.data);
            }
        });
    }, []);
    return (
        <div className={classes.RecommendPage}>
            <Typography variant="h4" className="pageTitle" > Movie List Recommend </Typography>
            <Gallery moviesRecommended={movieList}/>
        </div>

    )
}

export default MoviesListRecommened;