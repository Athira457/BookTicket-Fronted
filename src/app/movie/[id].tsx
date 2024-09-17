import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import styles from './about.module.css';

interface Movie {
  _id: string;
  name: string;
  poster: string;
  synopsis: string;
  rating: number;
}

interface MoviePageProps {
  movie: Movie;
}

const MoviePage: React.FC<MoviePageProps> = ({ movie }) => {
  // Render movie details
  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <Image
          src={`/uploads/${movie.poster}`}
          alt={movie.name}
          width={300}
          height={450}
          layout="responsive"
        />
      </div>
      <div className={styles.details}>
        <h1>{movie.name}</h1>
        <p>{movie.synopsis}</p>
        <div className={styles.rating}>Rating: {movie.rating}/10</div>
        <button className={styles.bookNowButton}>Book Now</button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async (context: GetServerSidePropsContext) => {
  const { id } = context.params as { id: string }; 
  try {
    const res = await fetch(`http://localhost:5000/movieId/${id}`);
    const movie = await res.json();
    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return {
      notFound: true, 
    };
  }
};

export default MoviePage;
