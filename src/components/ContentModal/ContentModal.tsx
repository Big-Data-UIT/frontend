import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Movie } from "../../model/Movie";
import "./ContentModal.css";
import RatingStar from '../RatingStar'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

interface Props {
  children: any,
  movie: Movie,
  onRate: Function,
}

export default function TransitionsModal(props : Props) {
  const classes = useStyles();
  const { children, movie, onRate} = props;
  const [open, setOpen] = useState(false);

  const handleRate = (i: number) => {
    onRate(movie.movieId, i);
  } 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
      >
        <div className="movie" onClick={handleOpen}>
          {children}
        </div>  
        <RatingStar changeRating={handleRate}/>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {movie && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    movie.Poster
                      ? movie.Poster
                      : 'https://www.movienewz.com/img/films/poster-holder.jpg'
                  }
                  alt={ movie.title}
                  className="ContentModal__portrait"
                />
                {/* <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                /> */}
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {movie.title} (
                    {(
                      movie.year ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {movie.tagline && (
                    <i className="tagline">{movie.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {movie.overview}
                  </span>

                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
