import { Badge } from "@material-ui/core";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import { Movie } from "../../model/Movie";


interface Props {
  movie: Movie,
  onRate: Function,
}

const SingleContent = (props: Props) => {
  const { movie, onRate } = props;
  return (
    <ContentModal movie={movie} onRate={onRate}>
      <Badge
        // badgeContent={vote_average}
        color="primary"
      />
      <img
        className="poster"
        src={movie.Poster ? movie.Poster : 'https://www.movienewz.com/img/films/poster-holder.jpg'}
        alt={movie.title}
      />
      <b className="title">{movie.title}</b>
      <p className="subTitle"> Genres : <span>{movie.genres}</span></p>
      <p className="subTitle">{movie.year}</p>
    </ContentModal>
  );
};

export default SingleContent;
