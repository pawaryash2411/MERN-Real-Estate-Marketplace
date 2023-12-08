import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
const Footer = () => {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-2xl font-semibold text-violet-800">
                Lets keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Connect with Me on My Social Media Accounts.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="https://www.linkedin.com/in/yash-pawar-kamdi-8041921b5/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaLinkedin
                      size={20}
                      className="text-violet-800 ml-[10px]"
                    />
                  </Link>
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="https://github.com/pawaryash2411"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaGithub size={20} className="text-violet-800 ml-[10px]" />
                  </Link>
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="https://www.instagram.com/_yash__2411/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <AiFillInstagram
                      size={20}
                      className="text-violet-800 ml-[10px]"
                    />
                  </Link>
                </button>
                <button
                  className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    to="https://github.com/pawaryash2411"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <IoLogoFacebook
                      size={20}
                      className="text-violet-800 ml-[10px]"
                    />
                  </Link>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block border-b border-violet-800 uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        to="/about"
                      >
                        About Me
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        to="/"
                      >
                        Contact Me
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        to="https://github.com/pawaryash2411"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Github
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        to="/"
                      >
                        Portfolio
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-1 border-violet-800" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2023 || </span>
                <Link to={"/"} className="text-violet-800">
                  HomeCore
                  <span className="text-red-500">.</span>
                </Link>
                <span className="text-blueGray-500 hover:text-blueGray-800 ml-2">
                  by YASH PAWAR KAMDI
                </span>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
