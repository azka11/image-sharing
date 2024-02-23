import React, { useEffect, useState } from "react";
import { getSpecificUser } from "../modules/fetch/user";
import { jwtDecode } from "jwt-decode"

function DropdownMenu({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dataUser, setDataUser] = useState([])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchUserData = async () => {
    const result = await getSpecificUser()
      setDataUser(result.user)
  }

useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <div className="relative inline-block text-left">
      <div>
        <a
          className="flex w-10 h-10 justify-center rounded-full bg-gray-800 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 border-double border-4 border-sky-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
          style={{backgroundImage: dataUser && dataUser.image ? `url(http://localhost:3000/${dataUser.image})` : 'none', backgroundSize: "cover"}}
          >
            <p className="text-white text-left pr-24 mt-1 ">{dataUser.username}</p>
        </a>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <a
              href="/profile"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Profile
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Account settings
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;