import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllListings = () => {
  const [getListing, setGetListing] = useState([]);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setError(false);
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/v1/userlisting/${currentUser._id}`);
        setGetListing(res.data);
        setError(true);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetch();
  }, []);

  const handleEdit = () => {};

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/deleteList/${id}`);
      console.log(res);
      const getlist = getListing.filter((listing) => listing._id !== id);
      setGetListing(getlist);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p className="p-3 text-base text-center">{error}</p>}
      <div className="overflow-x-auto p-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {getListing.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <th>1</th>
                    <td>
                      <img
                        src={item.imageUrls[0]}
                        alt=""
                        width={70}
                        height={70}
                      />
                    </td>
                    <td><Link to={`/single-listing/${item._id}`}>{item.name}</Link></td>
                    <td>
                      <button
                        onClick={handleEdit}
                        className="bg-green-400 text-white px-2 py-1 rounded-md">
                      <Link to={`/update-listing/${item._id}`}>update</Link>  
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-400 text-white px-2 py-1 rounded-md"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllListings;
