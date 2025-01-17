import { FaLocationDot, FaPhone, FaVoicemail } from "react-icons/fa6";
import logo from "../../../assets/logo.png";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="dark:bg-slate-200 dark:text-black">
      <footer className="footer  p-10">
        <aside>
          <img src={logo} className="w-full h-32" alt="" />
          <p>
            www.traveling.com
            <br />
            Providing reliable tech since 2025
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Discover</h6>
          <a className="/">Home</a>
          <a className="">About</a>
          <a className="">Tour</a>
        </nav>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Gallery</a>
          <a className="link link-hover">Login</a>
          <a className="link link-hover">Register</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <div className="flex items-center gap-3">
            <FaLocationDot className="text-[#08B3AB]"></FaLocationDot>
            <a className="link link-hover">Address: Madhupur,Tangail</a>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineEmail className="text-[#08B3AB]"></MdOutlineEmail>
            <a className="link link-hover">Email:tawhidulislam3482@gmail.com</a>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-[#08B3AB]"></FaPhone>
            <a className="link link-hover">Phone: 01826853371</a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
