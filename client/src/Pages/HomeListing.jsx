import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  createListingFail,
  createListingRequest,
  createListingSuccess,
} from "../../redux/list/listingSlice";
import { FaLeaf, FaBath, FaBed } from "react-icons/fa";
import { MdRoom, MdDoNotDisturb, MdChair } from "react-icons/md";
import { TbToolsKitchen3, TbArmchairOff } from "react-icons/tb";
import { LuParkingCircle, LuParkingCircleOff } from "react-icons/lu";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { ImUserTie } from "react-icons/im";
import ContactLandLord from "../Components/ContactLandLord";

const HomeListing = () => {
  const { id } = useParams();
  const [showListing, setShowListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [contactLandlordSection, setContactLandLordSection] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const showLandLordSection = () => {
    setContactLandLordSection(!contactLandlordSection);
  };

  useEffect(() => {
    const fetchSingleListing = async () => {
      try {
        dispatch(createListingRequest());
        const response = await axios.get(
          `/api/listing/get-singlelisting/${id}`
        );
        if (response.data.success === true) {
          dispatch(createListingSuccess(response.data.List));
          setShowListing(response.data.List);
        } else {
          toast.error(response.data.message);
          dispatch(createListingFail(response.data.message));
        }
      } catch (error) {
        console.log(error);
        dispatch(createListingFail(error.response.data.message));
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleListing();
  }, [id, dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? showListing?.imageUrls?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === showListing?.imageUrls?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (loading) {
    return <h1 className="text-center mt-36 text-violet-800">Loading...</h1>;
  }

  return (
    <>
      <div className="max-w-full h-[580px] w-full m-auto py-16 px-4 relative group mt-10">
        <div
          style={{
            backgroundImage: `url(${showListing?.imageUrls[currentIndex]})`,
          }}
          className="w-full h-full rounded-xl bg-center bg-cover duration-700"
        ></div>
        <div className="absolute inset-x-[15%] bottom-16 hidden py-5 text-center text-white md:block">
          <h2 className="text-3xl font-bold tracking-widest uppercase text-white ">
            {showListing?.type}
          </h2>
        </div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {showListing?.imageUrls.map((image, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="  text-black px-8  md:px-8 mb-6"
      >
        <div>
          <div className="flex flex-row justify-between px-4">
            <h1 className="text-3xl font-bold text-violet-800">
              {showListing?.name}
              <div className="flex gap-1 mt-4">
                <MdRoom className="text-green-500" />
                <h1 className="text-black text-lg">{showListing?.address}</h1>
              </div>
            </h1>

            {showListing?.discountPrice ? (
              <div className="flex gap-2">
                <div className="animate-giggle">
                  <h1 className="text-xl font-bold text-green-500">
                    Rs.{showListing?.discountPrice}
                  </h1>
                </div>
                <h1 className="text-md font-bold text-gray-700 line-through mt-1">
                  {showListing?.regularPrice}
                </h1>
                /month
              </div>
            ) : (
              <h1 className="text-xl font-bold">
                Rs.{showListing?.regularPrice} /month
              </h1>
            )}
          </div>

          <div className="flex justify-start flex-wrap p-4">
            <h1 className="text-black font-bold text-lg">
              Description:{" "}
              <span className="text-md font-medium">
                {showListing?.description}
              </span>
            </h1>
          </div>
          <div className="flex justify-end flex-wrap p-4">
            <h1 className="text-black font-bold text-lg flex items-center gap-1">
              <ImUserTie />
              Listed by:{" "}
              <span className="text-md font-medium">
                {showListing?.listedBy}
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-10 px-16 gap-5">
            <div className="flex justify-evenly flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 p-1">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-800 shadow-2xl">
                <FaBed size={36} />
              </div>
              <h2 className="uppercase mt-6 text-indigo-800 font-medium mb-3">
                Number of Bedrooms : {showListing?.bedrooms}
              </h2>
              <p className="font-light text-sm text-gray-500 mb-3"></p>
            </div>

            <div className="flex justify-evenly flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 p-1">
              <div className="bg-green-100 rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl">
                <FaBath size={36} />
              </div>
              <h2 className="uppercase mt-6 text-indigo-800 font-medium mb-3">
                Number of Bathroom : {showListing?.bathrooms}
              </h2>
            </div>

            <div className="flex justify-evenly flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 p-1">
              <div className="bg-red-100 rounded-full w-16 h-16 flex justify-center items-center text-red-500 shadow-2xl">
                <TbToolsKitchen3 size={36} />
              </div>
              <h2 className="uppercase mt-6 text-indigo-800 font-medium mb-3">
                Number of Kitchens : {showListing?.kitchens}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 mt-4">
            {showListing?.furnished === true ? (
              <div className="p-2 sm:w-1/3 w-full">
                <div className="bg-white shadow-md rounded flex p-4 h-full items-center">
                  <MdChair className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">Furnished</span>
                </div>
              </div>
            ) : (
              <div className="p-2 sm:w-1/3 w-full">
                <div className="bg-white shadow-md rounded flex p-4 h-full items-center">
                  <TbArmchairOff className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">UnFurnished</span>
                </div>
              </div>
            )}

            {showListing?.parking === true ? (
              <div className="p-2 sm:w-1/3 w-full">
                <div className="bg-white shadow-md rounded flex p-4 h-full items-center">
                  <LuParkingCircle className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">Parking Spot</span>
                </div>
              </div>
            ) : (
              <div className="p-2 sm:w-1/3 w-full">
                <div className="bg-white shadow-md rounded flex p-4 h-full items-center">
                  <LuParkingCircleOff className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">
                    No Parking Spot
                  </span>
                </div>
              </div>
            )}
            {showListing?.garden === true ? (
              <div className="p-2 sm:w-1/3 w-full">
                <div className="bg-white shadow-md rounded flex p-4 h-full items-center">
                  <FaLeaf className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">Gardening Area</span>
                </div>
              </div>
            ) : (
              <div className="p-2 sm:w-1/3 w-full">
                <div className="bg-white shadow-md rounded flex p-4 h-full items-center">
                  <MdDoNotDisturb className="text-violet-800 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium">
                    No Gardening Area
                  </span>
                </div>
              </div>
            )}
          </div>

          {currentUser && showListing?.listerId !== currentUser?._id && (
            <>
              {contactLandlordSection ? (
                <>
                  <ContactLandLord
                    listing={showListing}
                    showLandLordSection={showLandLordSection}
                  />
                </>
              ) : (
                <div className="flex justify-center my-16">
                  <button
                    type="button"
                    onClick={showLandLordSection}
                    className="bg-violet-800 text-xl w-1/2 shadow-md text-white p-2 px-4 rounded-md 
              hover:bg-violet-600 transition ease-in-out duration-300"
                  >
                    Contact Landlord
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default HomeListing;
