import Axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { app } from "../../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { listingId } = useParams();
  const [files, setFiles] = useState([]);
  const [listingData, setListingData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bathrooms: 1,
    bedrooms: 1,
    kitchens: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    furnished: false,
    parking: false,
    garden: false,
    imageUrls: [],
    listerId: currentUser?._id,
    listedBy: currentUser?.username,
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleListing = async () => {
      try {
        const response = await Axios.get(
          `/api/listing/get-singlelisting/${listingId}`
        );
        if (response.data.success === true) {
          setListingData(response.data.List);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    fetchSingleListing();
  }, []);

  const imageSubmitHandler = () => {
    if (isUploading) {
      return;
    }

    if (
      files.length > 0 &&
      files.length < 7 + listingData.imageUrls.length < 7
    ) {
      setIsUploading(true);
      const allFiles = [];

      for (let i = 0; i < files.length; i++) {
        allFiles.push(storeImages(files[i]));
      }
      Promise.all(allFiles)
        .then((urls) => {
          setListingData({
            ...listingData,
            imageUrls: listingData.imageUrls.concat(urls),
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Image should be less than 2MB");
        })
        .finally(() => {
          setIsUploading(false);
        });
    } else {
      toast.error("You can't upload more than 6 image per listing");
    }
  };

  const storeImages = (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state.changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const removeImageHandler = (i) => {
    setListingData({
      imageUrls: listingData.imageUrls.filter((image, index) => index !== i),
    });
  };

  const handleListingChanges = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setListingData({
        ...listingData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "garden" ||
      e.target.id === "offer"
    ) {
      setListingData({
        ...listingData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setListingData({
        ...listingData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleUpdateListing = async () => {
    try {
      if (
        !listingData.name ||
        !listingData.description ||
        !listingData.address ||
        listingData.imageUrls.length < 1
      ) {
        toast.error(
          "Please fill in all required fields and upload at least one image."
        );
        return;
      }

      if (listingData.regularPrice < listingData.discountPrice) {
        toast.error("Discounted Price must be less than Price");
        return;
      }
      const response = await Axios.put(
        `/api/listing/update/${listingId}`,
        listingData
      );
      if (response.data.success === true) {
        navigate(`/view-listing/${currentUser?._id}`);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
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
            className="rounded bg-white text-black shadow-md p-4 px-4 md:p-8 mb-6 mt-24"
          >
            <div className="my-3">
              <label className="text-violet-800 text-3xl font-bold ">
                Update Listing
              </label>
            </div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5 mt-4">
                    <input
                      type="text"
                      placeholder="Name*"
                      id="name"
                      className="h-15 border mt-1  px-4 w-full p-4 text-lg rounded-sm bg-gray-200 focus:outline-none"
                      required
                      value={listingData.name}
                      onChange={handleListingChanges}
                    />
                  </div>

                  <div className="md:col-span-5 mt-4">
                    <textarea
                      rows="6"
                      className="h-24 border mt-1  px-4 w-full p-4 text-lg rounded-sm bg-gray-200 focus:outline-none"
                      placeholder="Description*"
                      id="description"
                      required
                      value={listingData.description}
                      onChange={handleListingChanges}
                    />
                  </div>

                  <div className="md:col-span-5 mt-4">
                    <textarea
                      rows="3"
                      className="h-24 border mt-1  px-4 w-full p-4 text-lg rounded-sm bg-gray-200 focus:outline-none"
                      placeholder="Location*"
                      id="address"
                      required
                      value={listingData.address}
                      onChange={handleListingChanges}
                    />
                  </div>

                  <div className="md:col-span-3 mt-4">
                    <label className="text-lg">Type*</label>
                    <div className="flex justify-start flex-wrap gap-5 mt-3">
                      <div className="flex justify-start">
                        <input
                          type="checkbox"
                          id="sell"
                          className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                          checked={listingData.type === "sell"}
                          onChange={handleListingChanges}
                        />
                        <p>Sell</p>
                      </div>
                      <div className="flex justify-start">
                        <input
                          type="checkbox"
                          id="rent"
                          className="w-12 text-lg rounded-sm bg-violet-600 focus:outline-none"
                          checked={listingData.type === "rent"}
                          onChange={handleListingChanges}
                        />
                        <p>Rent</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 mt-4">
                    <label className="text-lg">Facilities*</label>
                    <div className="flex justify-start flex-wrap gap-5 mt-3">
                      <div className="flex justify-start">
                        <input
                          type="checkbox"
                          id="parking"
                          className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                          checked={listingData.parking}
                          onChange={handleListingChanges}
                        />
                        <p>Parking Spot</p>
                      </div>
                      <div className="flex justify-start">
                        <input
                          type="checkbox"
                          id="furnished"
                          className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                          checked={listingData.furnished}
                          onChange={handleListingChanges}
                        />
                        <p>Furnished</p>
                      </div>
                      <div className="flex justify-start">
                        <input
                          type="checkbox"
                          id="garden"
                          className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                          checked={listingData.garden}
                          onChange={handleListingChanges}
                        />
                        <p>Garden</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 mt-4">
                    <div className="flex justify-start gap-20">
                      <div className="flex border mt-1  px-1 w-20 p-3 text-sm rounded-sm bg-gray-200 focus:outline-none">
                        <input
                          type="number"
                          id="bedrooms"
                          min={0}
                          max={10}
                          className="px-4 appearance-none outline-none text-gray-800 w-20 bg-transparent"
                          value={listingData?.bedrooms}
                          onChange={handleListingChanges}
                          required
                        />
                        <span>Beds*</span>
                      </div>
                      <div className=" flex border mt-1  px-1 w-20 p-3 text-sm rounded-sm bg-gray-200 focus:outline-none">
                        <input
                          type="number"
                          id="bathrooms"
                          min={0}
                          max={10}
                          className="px-4 appearance-none outline-none text-gray-800 w-20 bg-transparent"
                          required
                          value={listingData?.bathrooms}
                          onChange={handleListingChanges}
                        />
                        <span>Baths*</span>
                      </div>
                      <div className=" flex border mt-1  px-1 w-20 p-3 text-sm rounded-sm bg-gray-200 focus:outline-none">
                        <input
                          type="number"
                          id="kitchens"
                          min={0}
                          max={10}
                          className="px-4 appearance-none outline-none text-gray-800 w-20 bg-transparent"
                          required
                          value={listingData.kitchens}
                          onChange={handleListingChanges}
                        />
                        <span>Kitchens*</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 mt-4">
                    <div className=" flex justify-start border mt-1  w-full p-3  rounded-sm bg-gray-200 focus:outline-none">
                      <input
                        type="number"
                        className="px-4 appearance-none outline-none text-gray-800 w-[70%] bg-transparent"
                        required
                        min={0}
                        id="regularPrice"
                        value={listingData.regularPrice}
                        onChange={handleListingChanges}
                      />
                      <span className="text-sm">Pricing (Rs/Month)*</span>
                    </div>
                    <div className="flex justify-start mt-3">
                      <input
                        type="checkbox"
                        id="offer"
                        className="w-12 text-lg rounded-sm bg-gray-200 focus:outline-none"
                        checked={listingData.offer}
                        onChange={handleListingChanges}
                      />
                      <p>Apply Offer</p>
                    </div>
                  </div>
                  {listingData.offer === true ? (
                    <div className="md:col-span-3 mt-4">
                      <div className=" flex justify-start border mt-1  w-full p-3  rounded-sm bg-gray-200 focus:outline-none">
                        <input
                          type="number"
                          className="px-4 appearance-none outline-none text-gray-800 w-[60%] bg-transparent"
                          required
                          min={0}
                          id="discountPrice"
                          value={listingData.discountPrice}
                          onChange={handleListingChanges}
                        />
                        <span className="text-sm">
                          Discounted Price (Rs/Month)*
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="md:col-span-3 mt-4">
                    <div className=" flex border mt-1  px-1 w-full p-3 text-sm rounded-sm bg-gray-200 focus:outline-none">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="p-1 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        onChange={(e) => setFiles(e.target.files)}
                      />
                      <button
                        onClick={imageSubmitHandler}
                        className="bg-green-800 text-sm shadow-md text-white p-2 px-2 rounded-md hover:bg-green-600 transition ease-in-out duration-300"
                        disabled={isUploading}
                      >
                        {isUploading ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                    <label className="text-md font-bold">
                      Note:{" "}
                      <span className="font-medium">
                        The first image will be the cover image.
                      </span>
                    </label>
                  </div>

                  <div className="md:col-span-5 text-right mt-5">
                    <div className="flex gap-2 flex-wrap">
                      {listingData?.imageUrls?.length > 0 &&
                        listingData?.imageUrls.map((images, i) => (
                          <div key={i}>
                            <img
                              src={images}
                              alt=""
                              className="h-20 w-36 rounded-md object-contain"
                            />
                            <ImCross
                              onClick={() => removeImageHandler(i)}
                              className="text-xl p-1 rounded-full bg-red-200 text-gray-600 relative 
                              left-[7.5rem] bottom-20 cursor-pointer hover:text-red-800"
                            />
                          </div>
                        ))}
                    </div>
                    <div className="inline-flex items-end">
                      <button
                        type="button"
                        onClick={handleUpdateListing}
                        className="bg-violet-800 text-xl shadow-md text-white p-2 px-4 rounded-md hover:bg-violet-600 transition ease-in-out duration-300"
                      >
                        Update
                      </button>
                      <Link to={`/view-listing/${currentUser?._id}`}>
                        <button className="bg-gray-800 text-xl shadow-md text-white p-2 px-4 rounded-md hover:bg-gray-600 transition ease-in-out duration-300 ml-5">
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UpdateListing;
