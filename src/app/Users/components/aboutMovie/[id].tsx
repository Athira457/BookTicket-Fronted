// Single movie page
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import styles from './Movie.module.css';

interface MovieProps {
  movie: {
    poster: string;
    synopsis: string;
    rating: number;
  };
}

const MoviePage = ({ movie }: MovieProps) => {
  const handleBookNow = () => {
    window.location.href = '/book-now';
  };

  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <Image
          src={`/uploads/${movie.poster}`}
          alt="Movie Poster"
          width={300}
          height={450}
          layout="responsive"
        />
      </div>
      <div className={styles.details}>
        <h1>Movie Synopsis</h1>
        <p>{movie.synopsis}</p>
        <div className={styles.rating}>Rating: {movie.rating}/10</div>
        <button onClick={handleBookNow} className={styles.bookNowButton}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

  if (typeof id === 'string') {
    const movie = {
      poster: 'poster.jpg', 
      synopsis: 'helllo', 
      rating: 8.5, 
    };

    return {
      props: {
        movie,
      },
    };
  }

  return {
    notFound: true,
  };
};


export default MoviePage;
