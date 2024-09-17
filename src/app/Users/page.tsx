import styles from './home.module.css';
import AutoSlider from './components/slideShow/page';
import Header from './components/header/page';
import Footer from './components/footer/page';
import MovieGrid from './components/movieBanner/page';

const UserPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
    <Header/>
    <AutoSlider/>
    <MovieGrid />
    <Footer />
  </div>
  );
};

export default UserPage;
