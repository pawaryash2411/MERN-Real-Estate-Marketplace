import { useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

const Sidebar = ({
  searchTerm,
  offer,
  type,
  garden,
  parking,
  furnished,
  sort,
  order,
  OnChange,
  handleApplyFilters,
}) => {
  const [openBar, setOpenBar] = useState(true);

  const toggleSidebar = () => {
    setOpenBar(!openBar);
  };

  return (
    <>
      <div
        className={`${
          openBar ? "w-1/4" : "w-10"
        }  bg-white shadow-2xl ease-in-out duration-600`}
      >
        {openBar ? (
          <IoMdArrowDropleftCircle
            onClick={toggleSidebar}
            className="text-[2rem] text-violet-800 relative left-64 top-28 cursor-pointer "
          />
        ) : (
          <IoMdArrowDroprightCircle
            onClick={toggleSidebar}
            className="text-[2rem] text-violet-800 mt-28 relative left-6 cursor-pointer"
          />
        )}

        <div className={`${!openBar ? "hidden" : ""}mt-16`}>
          <h1
            className={`${
              !openBar
                ? "hidden"
                : "text-violet-800 text-2xl font-bold text-start p-3"
            } `}
          >
            Filters
          </h1>
          <form
            className={`${
              !openBar ? "hidden" : ""
            } bg-slate-50 rounded-md p-2 m-2 flex items-center`}
          >
            <input
              type="text"
              placeholder="search your dream home..."
              className="text-violet-800 focus:outline-none w-72 transition bg-slate-50"
              id="searchTerm"
              value={searchTerm}
              onChange={OnChange}
            />
          </form>
        </div>

        <div className={`${!openBar ? "hidden" : ""}`}>
          <div className="md:col-span-3 m-4 mt-12">
            <label className="text-md text-violet-800">Type</label>
            <div className="flex justify-start flex-wrap gap-5 mt-3">
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="all"
                  className="w-12 text-lg rounded-sm bg-violet-600 focus:outline-none"
                  checked={type === "all"}
                  onChange={OnChange}
                />
                <p>All</p>
              </div>
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                  checked={type === "sell"}
                  onChange={OnChange}
                />
                <p>Sell</p>
              </div>
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-12 text-lg rounded-sm bg-violet-600 focus:outline-none"
                  checked={type === "rent"}
                  onChange={OnChange}
                />
                <p>Rent</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${!openBar ? "hidden" : ""}`}>
          <div className="md:col-span-3 m-4 mt-12">
            <label className="text-md text-violet-800">Facilities</label>
            <div className="flex justify-start flex-wrap gap-5 mt-3">
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-12 text-lg rounded-sm bg-violet-600 focus:outline-none"
                  checked={parking}
                  onChange={OnChange}
                />
                <p>Parking</p>
              </div>
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                  checked={furnished}
                  onChange={OnChange}
                />
                <p>Furnished</p>
              </div>
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="garden"
                  className="w-12 text-lg rounded-sm bg-violet-600 focus:outline-none"
                  checked={garden}
                  onChange={OnChange}
                />
                <p>Garden</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${!openBar ? "hidden" : ""}`}>
          <div className="md:col-span-3 m-4 mt-12">
            <label className="text-md text-violet-800">Discounted Price</label>
            <div className="flex justify-start flex-wrap gap-5 mt-3">
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-12 text-lg rounded-sm bg-violet-600 focus:outline-none"
                  checked={offer}
                  onChange={OnChange}
                />
                <p>Discounted</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${!openBar ? "hidden" : ""}`}>
          <div className="md:col-span-3 m-4 mt-12">
            <label className="text-md text-violet-800">Sort By</label>

            <div
              className={`${
                !openBar ? "hidden" : ""
              } bg-slate-50 rounded-md p-2 m-2 flex items-center`}
              defaultValue={"created_at_desc"}
              id="sort_order"
              onChange={OnChange}
            >
              <select className="text-violet-800 focus:outline-none w-72 transition bg-slate-50">
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApplyFilters}
          className={`${
            !openBar
              ? "hidden"
              : "bg-violet-800 text-center text-md w-4/5 m-8 shadow-md text-white p-2 px-4 rounded-md hover:bg-violet-600 transition ease-in-out duration-300"
          }`}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default Sidebar;
