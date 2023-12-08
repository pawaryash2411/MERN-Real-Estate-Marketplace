import { Link } from "react-router-dom";
import HomeIcon from "../assets/HomeIcon.gif";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "") {
      toast.error("Please fill all the fields!!");
    } else {
      try {
        const response = await axios.post("/api/auth/sign-up", {
          username,
          email,
          password,
        });

        if (response.data.success === true) {
          navigate("/sign-in");
          toast.success(response.data.message);
        }
      } catch (err) {
        console.log(err);
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
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-stretch text-black "
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center signin-image opacity-80"
        >
          <div className="absolute  inset-0 z-100"></div>
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
          <div className="absolute z-0 lg:hidden inset-0 bg-no-repeat bg-cover items-center">
            <div className="absolute opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <div className="flex justify-center items-center">
              <img src={HomeIcon} alt="" className="h-8 w-8 mr-2" />
              <h1 className="text-xl md:text-xl sm:text-xl max-[640px]:text-md font-bold text-violet-800">
                HomeCore <span className="text-red-500">.</span>
              </h1>
            </div>
            <div className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
              <div className="pb-2 pt-4">
                <input
                  required
                  type="text"
                  placeholder="Username*"
                  value={username}
                  className="block w-full p-4 text-lg rounded-sm bg-white focus:outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  required
                  type="email"
                  placeholder="Email*"
                  value={email}
                  className="block w-full p-4 text-lg rounded-sm bg-white focus:outline-none"
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
                  onClick={HandleSignUpSubmit}
                  className="mt-3 text-white uppercase block w-full p-4 text-lg rounded-md bg-violet-800 shadow-md hover:bg-violet-600 focus:outline-none ease-in-out duration-200"
                >
                  SignIn
                </button>
                <OAuth />
              </div>
            </div>

            <div className="mt-2 text-center text-black">
              Already have an Account?{" "}
              <Link to="/sign-in" className="text-blue-800 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default SignUp;
