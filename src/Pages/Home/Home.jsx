import Banner from "./Banner/Banner";
import Experience from "./Experience/Experience";
import Gallery from "./Gallery/Gallery";
import Navber from "./Navbar/Navbar";
import Tour from "./TourPlace/Tour";

const Home = () => {
  return (
    <div className="dark:bg-slate-300 dark:text-black p-12">
      <Banner></Banner>
      <Tour></Tour>
      <Experience></Experience>
      <Gallery></Gallery>
    </div>
  );
};

export default Home;
