import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        marginTop: theme.spacing(2),
        },
    },
    'radioStar': {
        display : 'none'
    },
    'star' : {
        cursor: 'pointer',
        transition:  'color 200ms'
    }
}));

interface Props {
    changeRating: Function
}

const RatingStar = (props : Props) => {
    const classes = useStyles();
    const [ rate, setRate ] = useState<any>(null);
    const { changeRating} = props; 
    const handleClick = (ratingValue:any) => {
        changeRating(ratingValue);
        setRate(ratingValue);
    }
    return(
        <div>
            {
                [...Array(5)].map((star,i) => {
                    const ratingValue = i +1;

                    return(
                        <label key={i}>
                            <input
                                className={classes.radioStar}
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => handleClick(ratingValue)}
                            />
                            <FaStar
                                className={classes.star}
                                color={ ratingValue <= rate ? '#ffc107': 'e4e5e9'}
                                size={20}
                            />
                        </label>
                    )
                })
            }
        </div>
    )
}

export default RatingStar;