import HomeIcon from "../assets/HomeIcon.gif";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <header className="fixed top-0 lg:w-[98%] md:w-[100%] z-10 p-6 lg:m-3 lg:rounded-lg sm:m-auto sm:rounded-none max-[640px]:m-auto max-[640px]:rounded-none border-none border-b shadow-lg  bg-white">
        <div className="container mx-auto flex justify-between">
          <NavLink to={"/"} className="flex items-center gap-2">
            <img src={HomeIcon} alt="Image" className="h-8 w-8" />
            <h1 className="text-xl md:text-xl sm:text-md max-[640px]:text-md font-bold text-violet-800">
              HomeCore <span className="text-red-500">.</span>
            </h1>
          </NavLink>

          <div className="flex gap-10 items-center">
            <NavLink
              to="/"
              className="text-violet-800 font-semibold  rounded-lg hover:text-violet-600 transition ease-in-out duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/marketplace"
              className="text-violet-800 font-semibold rounded-lg hover:text-violet-600 transition ease-in-out duration-300"
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/about"
              className="text-violet-800 font-semibold  rounded-lg hover:text-violet-600 transition ease-in-out duration-300"
            >
              About Me
            </NavLink>
          </div>

          <div className="flex items-center gap-6">
            {currentUser ? (
              <>
                <NavLink
                  to="/profile"
                  className="text-violet-800 rounded-lg hover:text-violet-600 transition ease-in-out duration-300"
                >
                  {currentUser?.photoURL && (
                    <img
                      src={currentUser?.photoURL}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover hover:opacity-85"
                    />
                  )}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/sign-up"
                  className="text-violet-800 font-medium rounded-lg hover:text-violet-600 transition ease-in-out duration-300"
                >
                  SignUp
                </NavLink>
                <NavLink
                  to="/sign-in"
                  className="bg-violet-800 shadow-md text-white p-2 px-4 rounded-lg hover:bg-violet-600 transition ease-in-out duration-300"
                >
                  LogIn
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
