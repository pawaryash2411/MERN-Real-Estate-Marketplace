import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  signOutUserFail,
  signOutUserRequest,
  signOutUserSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
} from "../../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [updateProfileSection, setUpdateProfileSection] = useState(false);
  const [trackPercent, setTrackPercent] = useState(0);
  const fileRef = useRef();
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState(undefined);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(currentUser?.photoURL || "");
  const [logoutSection, setLogoutSection] = useState(false);
  const [deleteSection, setDeleteSection] = useState(false);

  const showUpdateProfileSection = () => {
    setUpdateProfileSection(!updateProfileSection);
  };

  const showLogoutSection = () => {
    setLogoutSection(!logoutSection);
  };

  const showDeleteSection = () => {
    setDeleteSection(!deleteSection);
  };

  useEffect(() => {
    if (fileUpload) {
      fileUploadHandler(fileUpload);
    }
  }, [fileUpload]);

  const fileUploadHandler = (file) => {
    if (!file) {
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setTrackPercent(Math.round(progress));
      },
      (error) => {
        toast.error("Image should be less than 2MB");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setPhoto(downloadURL)
        );
      }
    );
  };

  const updateUserHandler = async () => {
    try {
      dispatch(updateUserRequest());
      const response = await axios.put(`/api/user/update/${currentUser?._id}`, {
        username,
        email,
        password,
        photoURL: photo,
      });
      if (response.data.success === true) {
        dispatch(updateUserSuccess(response.data.userInfo));
        showUpdateProfileSection();
        toast.success(response.data.message);
      } else {
        dispatch(updateUserFail(response.data.message));
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(updateUserFail(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  const deleteUserAccountHandler = async () => {
    try {
      dispatch(deleteUserRequest());

      const response = await axios.delete(
        `/api/user/delete/${currentUser?._id}`
      );
      if (response.data.success === true) {
        dispatch(deleteUserSuccess(response.data.userInfo));
        navigate("/sign-up");
        toast.success(response.data.message);
      } else {
        dispatch(deleteUserFail(response.data.message));
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFail(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  const logOutHandler = async () => {
    try {
      dispatch(signOutUserRequest());
      const response = await axios.get("/api/auth/sign-out");
      if (response.data.success === true) {
        dispatch(signOutUserSuccess(response.data.message));
        navigate("/sign-in");
        toast.success(response.data.message);
      } else {
        dispatch(signOutUserFail(response.data.message));
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(signOutUserFail(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex justify-center items-center my-32"
      >
        <div
          className="lg:w-1/2 sm:w-full p-10 sm:flex items-center rounded-md sm:space-x-6
         bg-white shadow-xl"
        >
          {updateProfileSection ? (
            <>
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              >
                <div className="w-1/2">
                  <img
                    src={currentUser?.photoURL}
                    alt=""
                    className="object-cover object-center w-auto h-auto rounded-full"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileRef}
                    onChange={(e) => setFileUpload(e.target.files[0])}
                  />
                  <IoAdd
                    className="bg-gray-100 p-2 cursor-pointer text-4xl rounded-full relative 
                        top-[-3rem] left-[8rem]"
                    onClick={() => fileRef.current.click()}
                  />

                  <p className="text-sm self-center">
                    {trackPercent > 0 && trackPercent < 100 ? (
                      <span className="text-slate-700">{`Uploading ${trackPercent}%`}</span>
                    ) : trackPercent === 100 ? (
                      <span className="text-green-700">
                        Image Uploaded successfully!
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>

                <div className="pb-2 pt-5">
                  <input
                    required
                    type="text"
                    placeholder="Username*"
                    className="block w-full p-4 text-lg rounded-sm bg-gray-100 focus:outline-none"
                    defaultValue={currentUser?.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="pb-2 pt-4">
                  <input
                    required
                    type="email"
                    placeholder="Email*"
                    className="block w-full p-4 text-lg rounded-sm bg-gray-100  focus:outline-none"
                    defaultValue={currentUser?.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="pb-2 pt-4">
                  <input
                    required
                    type="password"
                    placeholder="Password*"
                    className="block w-full p-4 text-lg rounded-sm bg-gray-100  focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center gap-6 mt-6">
                  <button
                    onClick={updateUserHandler}
                    className="bg-violet-800 text-lg shadow-md text-white p-2 px-4 rounded-lg hover:bg-violet-600 transition ease-in-out duration-300"
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-700 shadow-md text-lg text-white p-2 px-4 rounded-lg
                   hover:bg-gray-600 transition ease-in-out duration-300"
                    onClick={showUpdateProfileSection}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <div className="flex-shrink-0 w-full mb-6 h-auto sm:h-32 sm:w-32 sm:mb-0">
                {currentUser?.photoURL && (
                  <img
                    src={currentUser?.photoURL}
                    alt=""
                    className="object-cover object-center w-full h-full rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-4 items-left">
                <h2 className="text-3xl font-bold text-violet-800">
                  {currentUser?.username}
                </h2>

                <div className="space-y-1">
                  <span className="flex items-center space-x-2 text-black">
                    {currentUser?.email}
                  </span>
                </div>

                <div className="flex justify-start items-center gap-6 ">
                  <button
                    onClick={showUpdateProfileSection}
                    className="bg-violet-800 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-violet-600 transition ease-in-out duration-300"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={showLogoutSection}
                    className="bg-red-700 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-red-600 transition ease-in-out duration-300"
                  >
                    Logout
                  </button>
                </div>

                <div className="flex justify-start items-center gap-6 ">
                  <Link to="/create-listing">
                    <button className="bg-violet-800  text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-violet-600 transition ease-in-out duration-300">
                      Create Listing
                    </button>
                  </Link>

                  <button
                    onClick={showDeleteSection}
                    className="bg-red-700 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-red-600 transition ease-in-out duration-300"
                  >
                    Delete Account
                  </button>
                </div>
                <div className="flex justify-start items-center gap-6 ">
                  <Link to={`/view-listing/${currentUser?._id}`}>
                    <button className="bg-violet-800  text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-violet-600 transition ease-in-out duration-300">
                      View Listing
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {logoutSection && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="lg:w-[25rem] sm:w-56 py-5 px-5 sm:flex justify-center items-center rounded-md sm:space-x-6 bg-white shadow-xl absolute top-[5.5rem] "
          >
            <div className="flex flex-col space-y-4 items-left">
              <h2 className="text-md font-bold text-black mb-3">
                Are you sure you want to logout?
              </h2>

              <div className="flex justify-center items-center gap-6">
                <button
                  onClick={logOutHandler}
                  className="bg-red-700 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-red-600 transition ease-in-out duration-300"
                >
                  Logout
                </button>
                <button
                  onClick={showLogoutSection}
                  className="bg-gray-700 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-gray-600 transition ease-in-out duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {deleteSection && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="lg:w-[25rem] sm:w-56 py-5 px-5 sm:flex items-center rounded-md sm:space-x-6
        bg-white shadow-xl absolute top-[5rem] "
          >
            <div className="flex flex-col space-y-4 items-left">
              <h2 className="text-md text-center font-bold text-black">
                Are you sure you want to delete your account?
              </h2>

              <div className="flex justify-center items-center gap-6 ">
                <button
                  className="bg-red-700 text-sm shadow-md text-white p-2 px-4 rounded-lg
                   hover:bg-red-600 transition ease-in-out duration-300"
                  onClick={deleteUserAccountHandler}
                >
                  Delete
                </button>
                <button
                  onClick={showDeleteSection}
                  className="bg-gray-700 text-sm shadow-md text-white p-2 px-4 rounded-lg hover:bg-gray-600 transition ease-in-out duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Profile;
