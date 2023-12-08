import { Link } from "react-router-dom";
import HeroImage from "../assets/Hero.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <div className="flex flex-row justify-evenly items-center flex-wrap-reverse gap-10 p-10 w-full mt-20">
        <div>
          <h1 className="text-slate-600 font-bold text-3xl lg:text-5xl">
            Find your next <span className="text-violet-800">perfect</span>
            <br />
            place with ease
          </h1>
          <div className="text-violet-600 text-xs sm:text-sm mt-5 mb-16">
            HomeCore is the best place to find your next perfect place to live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={"/marketplace"}
            className="text-xs sm:text-sm text-violet-800 font-bold hover:underline "
          >
            Let's get started...
          </Link>
        </div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img
            src={HeroImage}
            alt=""
            className="w-[100%]  sm:h-[25rem] rounded-lg"
          />
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
