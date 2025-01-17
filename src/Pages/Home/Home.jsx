import Banner from "./Banner/Banner";
import Experience from "./Experience/Experience";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Navber from "./Navbar/Navbar";
import Review from "./Review/Review";
import Tour from "./TourPlace/Tour";

const Home = () => {
  return (
    <div className="dark:bg-slate-300 dark:text-black p-12">
      <Banner></Banner>
      <Tour></Tour>
      <Experience></Experience>
      <Gallery></Gallery>
      <Review></Review>
      <Info></Info>
    </div>
  );
};

export default Home;
