import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const List = Listing(req.body);
        await List.save();
        res.status(201).json({
            success: true,
            List,
            message: "Listing Created Successfully!!"
        })
    } catch (error) {
        next(error)
    }
}

export const viewUserListing = async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        return errorHandler(401, "Invalid User!! Can't View Listings", next)
    }
    try {
        const List = await Listing.find({ listerId: req.params.id });
        res.status(200).json({
            success: true,
            List,
            message: "Listing Found Successfully!!"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
        return errorHandler(404, "Listing not found", next);
    }

    if (req.user.id === req.params.id) {
        return errorHandler(401, "Invalid User!! Can't delete Listing", next)
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Listing Delete Successfully!!"
        })
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
        return errorHandler(404, "Listing not found", next);
    }

    if (req.user.id !== listing.listerId) {
        return errorHandler(401, "Invalid User!! Can't Update Listing", next)
    }
    try {
        const List = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            List,
            message: "Listing Updated Successfully!!"
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleListing = async (req, res, next) => {
    try {
        const List = await Listing.findById(req.params.id);

        if (!List) {
            return errorHandler(404, "Listing not found!!", next)
        }
        res.status(200).json({
            success: true,
            List,
            message: "Listing Found Successfully!!"
        })
    } catch (error) {
        next(error)
    }
}


export const getAllListing = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 12;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer, furnished = req.query.furnished, type = req.query.type,
            parking = req.query.parking, garden = req.query.garden;


        if (offer === undefined || offer === false) {
            offer = { $in: [true, false] }
        }
        if (parking === undefined || parking === false) {
            parking = { $in: [true, false] }
        }
        if (furnished === undefined || furnished === false) {
            furnished = { $in: [true, false] }
        }
        if (garden === undefined || garden === false) {
            garden = { $in: [true, false] }
        }

        if (type === undefined || offer === "all") {
            type = { $in: ["rent", "sell"] }
        }

        const searchTerm = req.body.searchTerm || "";
        const sort = req.body.sort || "createdAt";
        const order = req.body.order || "desc";

        const AllListings = await Listing.find({
            name: { $regex: searchTerm, $options: "i" },
            offer, parking, furnished, garden
        }).sort({ [sort]: order }).limit(limit).skip(startIndex);

        res.status(200).json({
            success: true,
            AllListings,
            message: "All Listings Found Successfully!!"
        })

    } catch (error) {
        next(error)
    }
}
