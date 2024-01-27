import axios from "axios";
import { app } from "../firebase.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';


const Qauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/v1/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  return (
    <div>
     <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-2 w-full mt-1 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
    </div>
  );
};

export default Qauth;
