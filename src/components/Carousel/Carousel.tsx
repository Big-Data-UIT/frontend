import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Movie } from "../../model/Movie";
import SingleContent from '../../components/SingleContent/SingleContent';
import "./Carousel.css";

const handleDragStart = (e : any) => e.preventDefault();

interface Props {
  moviesRecommended: Movie[]
}

const Gallery = (props : Props) => {
  const {moviesRecommended} = props;
  const items = moviesRecommended.map((movie: Movie, index) => {
      return(
          <SingleContent 
            movie={movie} 
            onRate={() => {}}
          />
      )
  });

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };


  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoWidth={true}
      autoPlay
    />
  );
};

export default Gallery;
