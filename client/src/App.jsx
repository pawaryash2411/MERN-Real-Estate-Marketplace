import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import CreateListing from "./Pages/Listing/CreateListing";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoutes from "./Components/PrivateRoutes";
import ViewListing from "./Pages/Listing/ViewListing";
import UpdateListing from "./Pages/Listing/UpdateListing";
import HomeListing from "./Pages/HomeListing";
import MarketPlace from "./Pages/MarketPlace";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/marketplace" element={<MarketPlace />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/create-listing" element={<CreateListing />} />
            <Route exact path="/view-listing/:id" element={<ViewListing />} />
            <Route
              exact
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
            <Route exact path="/listing/:id" element={<HomeListing />} />
          </Route>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
