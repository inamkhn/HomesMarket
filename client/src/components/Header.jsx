import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/userSlice";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const logoutHandler = async()=>{
    try {
      dispatch(signOutStart());
      const res = await axios.post("/api/v1/signout", {
        method: "POST",
        Authentication: `Brearer ${currentUser.access_token}`,
      });
      if (res.success === false) {
        dispatch(signOutFailure(res.message));
        return;
      }
      dispatch(signOutSuccess());
      // setUpdateSuccess(true);
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }


  return (
    <div className="">
      <div className="navbar flex items-center bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">RealeState</a>
        </div>
        <div className="flex items-center space-x-2 mr-6">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form onSubmit={handleSearch}>
            <div className="form-control">
              <div className="flex items-center ring-1 border-gray-300 p-1 rounded-lg">
                <input
                  type="text"
                  placeholder="Search"
                  className="input w-24 h-8 md:w-auto"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <CiSearch className="text-2xl font-bold" />
                </button>
              </div>
            </div>
          </form>

          {currentUser ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">
                      <p className="cursor-pointer">Profile</p>
                    </Link>
                  </li>
                  <li>
                    <a onClick={logoutHandler}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/sign-in">
              <p className="cursor-pointer">SignIn</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
