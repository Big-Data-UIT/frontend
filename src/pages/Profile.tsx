import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Divider} from '@material-ui/core'
import MoviesListRecommened from '../components/MoviesListRecommened';
import MoviesListRated from '../components/MoviesListRated';



const useStyles = makeStyles((theme) => ({
 
  }));

const Profile = () => {
    const classes = useStyles();
    return (
        <>
            <MoviesListRated/>

            <Divider variant="middle" />
            
            <MoviesListRecommened/>
        </>

    )
}

export default Profile;