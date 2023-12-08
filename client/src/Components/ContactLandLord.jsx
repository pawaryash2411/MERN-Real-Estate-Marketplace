import Axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ContactLandLord = ({ listing, showLandLordSection }) => {
  const [details, setDetails] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await Axios.get(
          `/api/user/get-userdetails/${listing?.listerId}`
        );

        if (response.data.success === true) {
          setDetails(response.data.userInfo);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchUserDetails();
  }, [listing?.listerId]);

  const contactMessageHandler = () => {
    if (message === "") {
      toast.error("Enter Valid Message!!");
    }
  };
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="lg:w-4/5 sm:mx-auto flex flex-col justify-center  mt-20"
      >
        <h1 className="text-sm font-normal">
          Contact{" "}
          <span className="font-bold uppercase">{details?.username}</span> for{" "}
          <span className="font-bold">{listing?.name}</span>{" "}
        </h1>
        <textarea
          rows="6"
          className="h-48 border mt-1 w-full p-4 text-lg shadow-lg rounded-lg bg-white focus:outline-none"
          placeholder="Description*"
          id="description"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </motion.div>
      <motion.div className="flex justify-center gap-5 my-10">
        <Link
          className="bg-violet-800 text-center text-xl w-1/4 shadow-md text-white p-2 px-4 rounded-md 
        hover:bg-violet-600 transition ease-in-out duration-300"
          to={`mailto:${details?.email}?subject=Regarding Listing of ${listing?.name} to ${details?.username}&body=${message}`}
        >
          <button type="button" onClick={contactMessageHandler}>
            Send Message
          </button>
        </Link>
        <button
          type="button"
          onClick={showLandLordSection}
          className="bg-gray-800 text-xl w-1/4 shadow-md text-white p-2 px-4 rounded-md 
              hover:bg-gray-600 transition ease-in-out duration-300"
        >
          Cancel
        </button>
      </motion.div>
    </>
  );
};

export default ContactLandLord;
