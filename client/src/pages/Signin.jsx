import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "../redux/userSlice";
import Qauth from "../components/Qauth";
import { useState } from "react";

const Signin = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // const {loading,error} = useSelector(state=>state.user)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        toast.success('Successfully toasted!')
        return;
      }
      toast.success('Login Success')
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
      toast.error('incorrect Email or password')
      dispatch(signinFailure(error.message));
    }
  };

  return (
    <div>
      <Toaster />
      <p className="p-5 text-center text-lg font-semibold">Sign In</p>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
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
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
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
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className='bg-blue-600 text-white p-2 w-full mt-1 rounded-lg uppercase hover:opacity-95'
        >
          Submit
        </button>
        <Qauth />
        <span className="text-xs">
          Create account? <Link to="/sign-up" className="text-sm">SignUp</Link>
        </span>
      </form>
    </div>
  );
};

export default Signin;
