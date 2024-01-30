// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import ProtectRoute from "./components/ProtectRoute";
import Listing from "./pages/Listing";
import AllListings from "./pages/AllListings";
import UpdateListing from "./pages/UpdateListing";
import SigleListing from "./pages/SigleListing";
import SearchPage from "./pages/Search";


function App() {
  return (
    <div className="mx-10">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/single-listing/:id" element={<SigleListing />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/all-listings" element={<AllListings />} />
          <Route element={<ProtectRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/listing" element={<Listing />} /> 
            <Route path="/update-listing/:id" element={<UpdateListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
