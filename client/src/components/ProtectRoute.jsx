import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";
// import Home from '../pages/Home'
// import Signin from "../pages/Signin";

const ProtectRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
  return (  currentUser ? <Outlet/> : <Navigate/>
  )
}

export default ProtectRoute