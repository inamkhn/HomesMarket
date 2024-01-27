import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteFailure,
  deleteSuccess,
  deleteStart,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";

const Profile = () => {
  const [file, setfile] = useState("");
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await axios.put(
        `/api/v1/update/${currentUser._id}`,
        formData,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          Authentication: `Brearer ${currentUser.access_token}`,
        }
      );
      const data = await res.json();
      setFormData("");
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      toast.success("profile updated successfully")
      dispatch(updateSuccess(data));
      // setUpdateSuccess(true);
    } catch (error) {
      toast.success("profile updated success")
      dispatch(updateFailure(error.message));
    }
  };

  const deleteHandle = async () => {
    try {
      dispatch(deleteStart());
      const res = await axios.delete(`/api/v1/delete/${currentUser._id}`, {
        Authentication: `Brearer ${currentUser.access_token}`,
      });
      if (res.success === false) {
        dispatch(deleteFailure(res.message));
        return;
      }
      dispatch(deleteSuccess());
      // setUpdateSuccess(true);
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const signOutHandle = async () => {
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
  };

  return (
    <div>
      <Toaster/>
      <div className="flex justify-center">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setfile(e.target.files[0])}
          hidden
          accept="image/.*"
        />
        <div className="w-28 rounded-full">
          <img
            onClick={() => fileRef.current.click()}
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          />
        </div>
      </div>
      <p className="p-5 text-center text-xl font-semibold">Profile</p>
      {fileUploadError ? (
        <p className="text-red-400 text-center">
          Error occured using image upload
        </p>
      ) : filePerc > 0 && filePerc < 100 ? (
        <p className="text-yellow-600 text-center">%{filePerc}</p>
      ) : filePerc == 100 ? (
        <p className="text-green-600 text-center">Image 100% Upload</p>
      ) : (
        ""
      )}
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="text"
            id="password"
            placeholder="**********"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-40 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Udpate Account
          </button>

          <Link to="/listing"><button
            type="submit"
            className="text-white  bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Listing
          </button></Link>
        </div>
        <div className="text-red-500 flex justify-between mx-3 text-base p-2 pb-6 cursor-pointer">
          <p onClick={deleteHandle}>delete account</p>
          <Link to="/all-listings">
            <p className="text-green-400 hover:bg-gray-200 px-2 py-1 rounded-md mt-5 text-lg text-center">
              Show Listing
            </p>
          </Link>
          <p onClick={signOutHandle}>SignOut</p>
        </div>
      </form>
    </div>
  );
};

export default Profile;
