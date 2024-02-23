import Cookies from "js-cookie";
import { loginUser } from "../modules/fetch/user";
import { useState } from "react";

function LoginForm({ closeLoginModal, setError, openSignUpModal, reloadData, postProfile, profile }) {
  
    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(
        e.target.username.value,
        e.target.password.value
      );
      const { token, currentUser, userId } = response
      Cookies.set("token", token, { expires: 1 })
      Cookies.set("currentUser", currentUser, { expires: 1 })
      Cookies.set("userId", userId, { expires: 1 })

      // console.log(token)
      // console.log(currentUser)
      // console.log(userId)

      await closeLoginModal()
      await reloadData()

      await postProfile();
      await profile();

    } catch (err) {
      // Menyimpan pesan kesalahan ke state
      setError(`Error: ${err.message}`);
    }

    // const token = Cookies.get("token")
    // console.log(token)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 shadow-md p-6 rounded-3xl z-1">
        <button
          onClick={() => {
            closeLoginModal();
            setError(""); // Reset pesan kesalahan saat menutup modal
          }}
          className="text-white text-2xl hover:text-white font-bold"
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <form id="login-form" className="flex flex-col" onSubmit={handleLogin}>
          <input
            type="username"
            name="username"
            className="bg-gray-100 text-gray-500 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-500 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />
          <div className="flex items-center justify-between flex-wrap">
            <label
              htmlFor="remember-me"
              className="text-sm text-white cursor-pointer"
            >
              <input type="checkbox" id="remember-me" className="mr-2" />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline mb-0.5"
            >
              Forgot password?
            </a>
            <p className="text-white mt-4">
              {" "}
              Don't have an account?{" "}
              <a
                onClick={() => {
                  console.log("Sign-Up clicked");
                  closeLoginModal(); // Menutup modal login
                  openSignUpModal();
                }}
                className="text-sm text-blue-500 -200 hover:underline mt-4"
              >
                Sign Up
              </a>
            </p>
          </div>
          <button
            type="submit"
            form="login-form"
            onClick={() => {
              console.log("Sign-In clicked");
            }} // Gantilah dengan fungsi atau tindakan yang sesuai
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;