import GoogleIcon from "../assets/googleIcon.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("IsPopupOpen:", result);

      const response = await Axios.post("/api/auth/google-auth", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      if (response.data.success === true) {
        dispatch(signInSuccess(response.data.userInfo));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error while Authenticating with Google Auth", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <button
        className="flex justify-center font-semibold gap-3 items-center mt-3 text-black  w-full p-4 text-sm rounded-md bg-white shadow-md hover:bg-slate-100 focus:outline-none ease-in-out duration-200"
        onClick={handleGoogleAuth}
      >
        <img src={GoogleIcon} alt="" className="h-6 w-6" />
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
