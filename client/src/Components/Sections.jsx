import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { SiCloudbees } from "react-icons/si";
import { MdHotelClass } from "react-icons/md";
import { GiCloudRing } from "react-icons/gi";

const Sections = () => {
  return (
    <>
      <section className="bg-violet-600 body-font ">
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-center title-font text-white mb-4">
              Find Your Perfect Stay...
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-2/4 mx-auto text-white">
              Explore a world of comfort and luxury with our curated selection
              of hotels. Whether you are planning a business trip or a relaxing
              getaway, we have the perfect accommodation for you.
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="p-2 sm:w-1/2 w-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white shadow-md rounded flex p-4 h-full items-center"
              >
                <FaSearch className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium">
                  Search a huge selection
                </span>
              </motion.div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white shadow-md rounded flex p-4 h-full items-center"
              >
                <FaRupeeSign className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium">
                  Pay no hidden fees
                </span>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="p-2 sm:w-1/2 w-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white shadow-md rounded flex p-4 h-full items-center"
              >
                <SiCloudbees className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium">
                  Get more flexibility
                </span>
              </motion.div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white shadow-md rounded flex p-4 h-full items-center"
              >
                <GiCancel className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium">
                  Free cancellation
                </span>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="p-2 sm:w-1/2 w-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white shadow-md rounded flex p-4 h-full items-center"
              >
                <MdHotelClass className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium">Deluxe Suites</span>
              </motion.div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white shadow-md rounded flex p-4 h-full items-center"
              >
                <GiCloudRing className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                <span className="title-font font-medium">Urban Retreats</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sections;
