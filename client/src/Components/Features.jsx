import { GiCook } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const Features = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-8">
          <div className="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-800 shadow-2xl">
            <FaHouseCircleCheck size={36} />
          </div>
          <h2 className="uppercase mt-6 text-indigo-800 font-medium mb-3">
            Affordable Home Rates
          </h2>
          <p className="font-light text-sm text-gray-500 mb-3">
            "Home is where affordability meets possibility. Unlocking dreams
            should not come with a hefty price tag; its about making the joy of
            home-ownership accessible to all."
          </p>
          <a
            className="text-indigo-500 flex items-center hover:text-indigo-600"
            href="/"
          >
            More about this
            <IoIosArrowForward />
          </a>
        </div>
        <div className="p-8">
          <div className="bg-green-100 rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl">
            <FaLeaf size={36} />
          </div>
          <h2 className="uppercase mt-6 text-green-500 font-medium mb-3">
            Eco-friendly Atmosphere
          </h2>
          <p className="font-light text-sm text-gray-500 mb-3">
            "Building a home that embraces natures wisdom is not just about
            walls and roofs; its a commitment to harmony with the planet. An
            eco-friendly home is a testament to our responsibility, where every
            sustainable choice becomes a foundation for a greener tomorrow."
          </p>
          <a
            className="text-green-500 flex items-center hover:text-green-600"
            href="/"
          >
            More about this
            <IoIosArrowForward />
          </a>
        </div>
        <div className="p-8">
          <div className="bg-red-100 rounded-full w-16 h-16 flex justify-center items-center text-red-500 shadow-2xl">
            <GiCook size={36} />
          </div>
          <h2 className="uppercase mt-6 text-red-500 font-medium mb-3">
            Best Cooked Food & Beverages
          </h2>
          <p className="font-light text-sm text-gray-500 mb-3">
            "Good food is not just a feast for the palate; its a celebration of
            flavors that nourish the soul. In each bite, a symphony of tastes
            dances on the taste buds, turning a meal into a moment of pure
            delight."
          </p>
          <a
            className="text-red-500 flex items-center hover:text-red-600"
            href="/"
          >
            More about this
            <IoIosArrowForward />
          </a>
        </div>
      </div>
    </>
  );
};

export default Features;
