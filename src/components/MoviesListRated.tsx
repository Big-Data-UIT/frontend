import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ApiClient, getApiClient } from '../client/client';
import { Container, GridList, GridListTile, Typography} from '@material-ui/core'
import PaginationComponent from '../components/PaginationComponent';
import MovieCard from '../components/MovieCard';
import { Movie } from "../model/Movie";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
      marginTop: '50px'
    },
    gridList: {
      width: 1200,
      height: 500,
      margin: '50px 0px 0px 0px !important' 
    },
  }));

const MoviesListRated = () => {
    const classes = useStyles();
    const apiClient: ApiClient = getApiClient({ userId: 9999 });
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [page,setPage] = useState(1);
    const [offset,setOffSet] = useState(1);
    const [totalPage,setTotalPage] = useState<number>(1);
    const limit = 4;

    useEffect(() => {
        apiClient.getMovieList(offset,limit).then((response) => {
            if (response.status === "OK") {
                setMovieList(response.data);
                setTotalPage(Math. round(response.total/limit));
            }
        });
    }, [page,limit,setTotalPage]);

    
    const handleRate = (movieId: string, rate: number) => {
        apiClient.postMovieRating(movieId, rate,'999').then((response) => {
            if (response.status === "OK") {
                console.log(response);
            }
        });
    }
    const handlePageChange = (value :any) => {
        setPage(value);
        let newOffSet = value + limit;
        setOffSet(newOffSet); 
    }
    return (
        <>
            <Container maxWidth='xl' className={classes.root}>
                <Typography variant="h3" gutterBottom> Movie List Rated </Typography>
                <GridList cellHeight='auto' className={classes.gridList} cols={12} spacing={40}>
                    {movieList?.map((movie) => (
                    <GridListTile key={movie.movieId} cols={3}>
                        <MovieCard movie={movie} onRate={handleRate} />
                    </GridListTile>
                    ))}
                </GridList>
            </Container>
            <PaginationComponent total={totalPage} page={page} onClickPageChange={handlePageChange}/>
        </>

    )
}

export default MoviesListRated;