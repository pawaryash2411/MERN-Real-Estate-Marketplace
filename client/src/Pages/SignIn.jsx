import HomeIcon from "../assets/HomeIcon.gif";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Axios from "axios";
import {
  signInFail,
  signInRequest,
  signInSuccess,
} from "../../redux/user/userSlice";
import OAuth from "../Components/OAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, currentUser } = useSelector((state) => state.user);
  console.log(loading, error, currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill all the fields!!");
    } else {
      try {
        dispatch(signInRequest());
        const response = await Axios.post("/api/auth/sign-in", {
          email,
          password,
        });

        if (response.data.success === true) {
          dispatch(signInSuccess(response.data.userInfo));
          navigate("/");
          toast.success(response.data.message);
        } else {
          dispatch(signInFail(response.data.message));
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
        dispatch(signInFail(err.response.data.message));
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-stretch text-black "
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center signup-image opacity-80"
        >
          <div className="absolute  inset-0 z-0"></div>
          <div className="w-full px-24 z-0 text-white">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p className="text-2xl my-4">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mt-20 lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        >
          <div className="absolute lg:hidden z-10 inset-0 bg-no-repeat bg-cover items-center">
            <div className="absolute opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <div className="flex justify-center items-center">
              <img src={HomeIcon} alt="" className="h-8 w-8 mr-2" />
              <h1 className="text-xl md:text-xl sm:text-md max-[640px]:text-md font-bold text-violet-800">
                HomeCore <span className="text-red-500">.</span>
              </h1>
            </div>
            <div className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
              <div className="pb-2 pt-4">
                <input
                  required
                  type="email"
                  placeholder="Email*"
                  className="block w-full p-4 text-lg rounded-sm bg-white focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  required
                  className="block w-full p-4 text-lg rounded-sm bg-white focus:outline-none"
                  type="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-2 text-right text-slate-600 hover:underline hover:text-slate-900">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button
                  onClick={handleLoginUser}
                  className="mt-3 text-white uppercase block w-full p-4 text-lg rounded-md bg-violet-800 shadow-md hover:bg-violet-600 focus:outline-none ease-in-out duration-200"
                >
                  LogIn
                </button>
                <OAuth />
              </div>
            </div>
            <div className="mt-2 text-center text-black">
              SignIn to New Account{" "}
              <Link to="/sign-up" className="text-blue-800 hover:underline">
                Register
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default SignIn;
