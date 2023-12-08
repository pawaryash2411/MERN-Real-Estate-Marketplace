import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdRoom } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const ViewListing = () => {
  const { id } = useParams();
  const [listData, setListData] = useState([]);
  const [deleteListingSection, setDeleteListingSection] = useState(false);
  const [listingId, setListingId] = useState(null);
  const [deleteListingPosition, setDeleteListingPosition] = useState({
    top: 0,
    left: 0,
  });

  const showDeleteListingSection = (id, event) => {
    const listItem = event.currentTarget.closest(".data-list-item");
    if (listItem) {
      const { top, left } = listItem.getBoundingClientRect();
      setDeleteListingPosition({ top, left });
    }
    setDeleteListingSection(!deleteListingSection);
    setListingId(id);
  };

  const cancelDeleteListingSection = () => {
    setDeleteListingSection(!deleteListingSection);
  };

  const getUserListing = async () => {
    try {
      const response = await axios.get(`/api/listing/view/${id}`);
      if (response.data.success === true) {
        setListData(response.data.List);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getUserListing();
  }, []);

  const deleteListingHandler = async () => {
    try {
      const response = await axios.delete(`/api/listing/delete/${listingId}`);
      if (response.data.success === true) {
        toast.success(response.data.message);
        cancelDeleteListingSection();
        getUserListing();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 font-medium flex items-center justify-center ">
        <div className="container max-w-screen-lg">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="rounded bg-white text-black shadow-md p-4 px-4 md:p-8 mb-6 mt-20"
          >
            <div className="my-3">
              <label className="text-violet-800 text-3xl font-bold ">
                All Listing
              </label>
            </div>
            {listData && listData.length > 0 ? (
              <>
                {listData.map((listing, index) => (
                  <div
                    className="data-list-item container flex flex-col mx-auto lg:flex-row text-black border-b-2
                 border-violet-300 py-3"
                    key={index}
                  >
                    <div className="w-full lg:w-1/4">
                      <Link to={`/listing/${listing._id}`}>
                        <img
                          src={listing?.imageUrls[0]}
                          className="w-full h-full object-contain rounded-md hover:opacity-80"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold">
                          {listing?.name}
                        </h2>

                        <div className="flex gap-5">
                          <Link to={`/update-listing/${listing?._id}`}>
                            <FaEdit
                              size="24"
                              className="text-green-800 cursor-pointer  hover:text-green-600"
                            />
                          </Link>

                          <IoTrashSharp
                            onClick={(event) =>
                              showDeleteListingSection(listing._id, event)
                            }
                            size="24"
                            className="text-red-800 cursor-pointer hover:text-red-600"
                          />
                        </div>
                      </div>

                      <div className="flex justify-start gap-2 items-center">
                        <div className="flex  text-[.7rem] items-center">
                          <MdRoom size="20" /> {listing?.address}
                        </div>
                        <div className="flex items-center gap-1 self-start py-2 px-3 text-[.7rem] font-medium rounded-xl text-white bg-violet-800 ">
                          <FaRupeeSign /> {listing?.regularPrice}
                        </div>
                        <div className="flex items-center gap-1 self-start py-2 px-3 text-[.7rem] font-medium rounded-xl text-white bg-violet-800 ">
                          <FaBath /> {listing?.bathrooms}
                        </div>
                        <div className="flex items-center gap-1 self-start py-2 px-3 text-[.7rem] font-medium rounded-xl text-white bg-violet-800 ">
                          <FaBed /> {listing?.bedrooms}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h3>No Listing Created Yet...</h3>
            )}
          </motion.div>

          {deleteListingSection && (
            <motion.div
              initial={{
                y: deleteListingPosition.top,
                x: deleteListingPosition.left,
              }}
              animate={{
                y: deleteListingPosition.top,
                x: deleteListingPosition.left,
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="lg:w-[25rem] sm:w-56 py-5 px-5 sm:flex justify-center items-center rounded-md sm:space-x-6 bg-white shadow-xl absolute top-[5rem] right-[25rem]"
            >
              <div className="flex flex-col space-y-4 items-left">
                <h2 className="text-md font-bold text-black mb-3">
                  Are you sure you want to delete this listing?
                </h2>

                <div className="flex justify-center items-center gap-6">
                  <button
                    onClick={deleteListingHandler}
                    className="bg-red-700 text-sm shadow-md text-white p-2 px-4 rounded-lg
                     hover:bg-red-600 transition ease-in-out duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={cancelDeleteListingSection}
                    className="bg-gray-700 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-gray-600 transition ease-in-out duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewListing;
