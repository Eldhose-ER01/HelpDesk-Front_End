import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { removeUser } from '../../../Redux/UserSlice';

export default function Usernav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.user.userD);
        const isLoggedIn = user && user.username; 
console.log(user.username,"gggggggggggggg");

    const homelogout = () => {
        dispatch(removeUser());
        localStorage.clear();
        navigate("/login");
    };

    return (
      <nav className="bg-black shadow-md h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side: Helpdesk Icon */}
            <div className="flex items-center">
              <FaQuestionCircle className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-lg font-semibold text-green-300">Helpdesk</span>
            </div>
  
           
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  <FaUser className="h-5 w-5 text-sky-300" />
                  <span className="ml-2 text-green-200">{user.username}</span>
                  <FaSignOutAlt className="ml-4 h-5 w-5 text-red-500 cursor-pointer" onClick={homelogout} />
                </>
              ) : (
                <FaSignInAlt className="h-5 w-5 text-green-500 cursor-pointer" onClick={() => navigate("/login")} />
              )}
            </div>
          </div>
        </div>
      </nav>
    );
}
