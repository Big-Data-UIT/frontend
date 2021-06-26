import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ApiClient, getApiClient } from '../client/client';
import { Typography} from '@material-ui/core'
import PaginationComponent from '../components/PaginationComponent';
import SingleContent from '../components/SingleContent/SingleContent';
import { Movie } from "../model/Movie";

const useStyles = makeStyles((theme) => ({
    moviesRatePage: {
        paddingTop: '30px'
    },
    movies: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
  }));

const MoviesListRated = () => {
    const classes = useStyles();
    const apiClient: ApiClient = getApiClient({ userId: 1 });
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [page,setPage] = useState(1);
    const [offset,setOffSet] = useState(1);
    const [totalPage,setTotalPage] = useState<number>(1);
    const limit = 4;

    useEffect(() => {
        apiClient.getMovieListRated(offset,limit,'1').then((response) => {
            if (response.status === 200) {
                setMovieList(response.data);
                setTotalPage(Math. round(response.total/limit));
            }
        });
    }, [page,limit,setTotalPage]);

    
    const handleRate = (movieId: string, rate: number) => {
        apiClient.postMovieRating(movieId, rate,'1').then((response) => {
            if (response.status === 200) {
                console.log(response);
            }
        });
    }
    const handlePageChange = (value :any) => {
        let newOffSet = (value == 1)? 1 : (value-1)*limit + 1;
        setPage(value);
        setOffSet(newOffSet); 
    }
    return (
        <div className={classes.moviesRatePage}>
            <Typography variant="h4" className="pageTitle" > Movie List Rated </Typography>
            <div className={classes.movies}>
                    {movieList?.map((movie) => (                    
                        <SingleContent 
                            movie={movie} 
                            onRate={handleRate}
                        />
                    ))}
            </div>
            <PaginationComponent total={totalPage} page={page} onClickPageChange={handlePageChange}/>
        </div>

    )
}

export default MoviesListRated;