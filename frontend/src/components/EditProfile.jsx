import { editProfile } from "../modules/fetch/user";
import React, { useState, useEffect } from "react";

function EditProfile({ user, closeModal }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const [formData, setFormData] = useState({
       username: user.username,
       email: user.email,
       image: user.image
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const handleImageChange = (e) => {
        const image = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: image }));
        // setSelectedImage(file);
      };

      const handleFormSubmit = async (e) => {
            e.preventDefault();
            try {
              await editProfile(user.user_id, formData);
              // Panggil fungsi sukses dan tutup formulir
              // onEditSuccess();
              closeModal();
            //   allDataPost()

            } catch (error) {
              console.error("Failed to update product", error);
            }
          };

       useEffect(() => {
        if(user.image){
            setSelectedImage(`http://localhost:3000/${user.image}`)
         }
        }, [user])

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute bg-gray-500 opacity-60 inset-0 z-0"></div>
        <div className="w-full max-w-md bg-gray-800 shadow-md p-6 rounded-3xl z-10">
          <button
            onClick={() => {
              closeModal();
              // setError(""); // Reset pesan kesalahan saat menutup modal
            }}
            className="text-white text-2xl hover:text-white font-bold"
          >
            X
          </button>
          <h2 className="text-2xl font-bold text-white mb-4">Edit Profile</h2>
          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <input
              id="username"
              name="username"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="post title"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              id="email"
              name="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="post content"
              value={formData.email}
              onChange={handleInputChange}
            />
                
                <div className="flex items-center justify-center w-full" >
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {selectedImage && (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6" style={{backgroundImage: `url(${selectedImage})`, backgroundSize: "cover", width: "100%", height: "100%"}}>
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  )}
                  {/* {selectedImage && (
                  <img src={(selectedImage)} alt="Selected Image" className="" />
                  )} */}
                    <input id="dropzone-file" type="file" className="hidden"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange} />
                   
                </label>
              </div> 
            <button
              type="submit"
              onClick={() => console.log("Add Task clicked")} // Gantilah dengan fungsi atau tindakan yang sesuai
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              EDIT
            </button>
          </form>
        </div>
      </div>

    )
}

export default EditProfile;