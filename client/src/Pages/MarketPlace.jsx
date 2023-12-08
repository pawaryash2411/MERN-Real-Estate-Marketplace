import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { MdRoom } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import Sidebar from "../Components/Sidebar";

const MarketPlace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allListings, setAllListings] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    offer: false,
    parking: false,
    furnished: false,
    garden: false,
    type: "all",
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const gardenFromUrl = urlParams.get("garden");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      gardenFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === true,
        furnished: furnishedFromUrl === true,
        garden: gardenFromUrl === true,
        offer: offerFromUrl === true,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const response = await axios.get(
          `/api/listing/get-alllisting?${searchQuery}`
        );
        if (response.data.success === true) {
          setAllListings(response.data.AllListings);
          if (response.data.AllListings.length > 12) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const OnChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "garden" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]: e.target.checked === true,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("garden", sidebarData.garden);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/marketplace?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = allListings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setAllListings([...allListings, ...data]);
  };

  if (loading) {
    return <h1 className="text-center mt-36 text-violet-800">Loading...</h1>;
  }

  console.log(sidebarData);

  return (
    <>
      <div className="flex flex-row justify-start gap-5">
        <Sidebar
          searchTerm={sidebarData.searchTerm}
          offer={sidebarData.offer}
          parking={sidebarData.parking}
          furnished={sidebarData.furnished}
          garden={sidebarData.garden}
          type={sidebarData.type}
          sort={sidebarData.sort}
          order={sidebarData.order}
          OnChange={OnChange}
          handleApplyFilters={handleApplyFilters}
        />
        <div className="my-28 flex flex-row flex-wrap justify-start items-center gap-10">
          {allListings &&
            allListings.map((listing, index) => (
              <Link
                to={`/listing/${listing._id}`}
                className="container p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                key={index}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="overflow-hidden rounded-xl transition-all duration-400"
                >
                  <img
                    src={listing?.imageUrls[0]}
                    alt=""
                    className="w-full h-auto"
                  />
                </motion.div>
                <div className="flex justify-between items-start mt-3">
                  <div>
                    <h1 className="text-md font-semibold text-violet-800">
                      {listing?.name}
                    </h1>
                  </div>

                  {listing?.discountPrice ? (
                    <div>
                      <h1 className="text-[0.8rem] font-bold mt-1 text-green-500">
                        Rs.{listing?.discountPrice}/-
                      </h1>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-[0.8rem] font-bold mt-1">
                        Rs.{listing?.regularPrice}/-
                      </h1>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 items-center mt-2">
                  <MdRoom className="text-green-500" />
                  <h1 className="text-[.7rem] font-semibold ">
                    {listing?.address}
                  </h1>
                </div>
                <span className="mt-2 line-clamp-2 text-[.7rem]">
                  {listing?.description}
                </span>

                <div className="flex gap-1 justify-between items-center mt-5">
                  <h1 className="text-black font-bold text-sm flex items-center gap-1">
                    <ImUserTie />
                    <span className="text-md font-medium">
                      {listing?.listedBy}
                    </span>
                  </h1>
                  <div className="py-2 px-3 text-[.7rem] font-medium rounded-xl text-white bg-violet-800 ">
                    For {listing?.type}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
