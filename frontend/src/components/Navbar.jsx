import logo from "../assets/letter-g.png";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import { logoutUser } from "../modules/fetch/user";
import AddPhoto from "./AddPhoto";
import DropdownMenu from "./DropdownProfile";

function Navbar({reloadData, onSearch, postProfile, profile}) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [addModal, setAddModal] = useState(false)
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openAddModal = () => {
    setAddModal(true)
  }

  const closeAddModal = () => {
      setAddModal(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = async () => {
   try {
     await logoutUser();
     Cookies.remove("token");
     Cookies.remove("userId");
     Cookies.remove("currentUser");
     // localStorage.removeItem("token");
     setIsLogin(false);
     window.location.reload();
   } catch (error) {
    console.log("Failed to fetch data :", error.massage)
   }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const currentUser = Cookies.get("currentUser");
    const userId = Cookies.get("userId");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // console.log(token)
    // console.log(currentUser)
    // console.log(userId)
  },[Cookies.get("token")]);

  return (
    <div className="fixed top-0 left-0 w-full z-10">
    <nav className="bg-gray-800 p-3">
      <div className="max-w-auto mx-auto flex justify-between items-center ">
        <div className="h-8 w-8 mx-2">
          <img src={logo} alt="" />
        </div>
        <div className="fixed hidden lg:block">
          <div className="flex space-x-0 px-14">
            <a
              href="/home"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
              Home
            </a>
          {isLogin && (
            <button
            onClick={openAddModal}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Upload
            </button>
          )}
          </div>
        </div>

        {isLogin && (
          <form className="w-4/6 mx-auto" onSubmit={handleSubmit}>
          <label
            htmlFor="searchPhoto"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="searchPhoto"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        )}

        <div className="flex space-x-5">
          {!isLogin ? (
            <button
              onClick={openLoginModal}
              type="button"
              className="text-white text-sm font-semibold hover:text-purple-600 mr-4"
            >
              Sign in
            </button>
           ) : (
            <DropdownMenu handleLogout={handleLogout} />
          )}

          {!isLogin && (
            <a
              href="/register"
              className="text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">
              Sign up
            </a>
          )}
        </div>

        {isLoginModalOpen && (
          <LoginForm
            closeLoginModal={closeLoginModal}
            setError={setError}
            reloadData={reloadData}
            postProfile={postProfile}
            profile={profile}
          />
        )}

        {addModal && (
          <AddPhoto closeModal={closeAddModal} reloadData={reloadData} />
        )}
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
