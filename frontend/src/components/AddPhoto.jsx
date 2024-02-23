import React, { useState, useEffect } from "react";
import { createPhoto } from "../modules/fetch/photo";

function AddPhoto({closeModal, reloadData}) {
    
    const [formData, setFormData] = useState({
        photo_title: "",
        description: "",
        photo_img: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleImageChange = (e) => {
        const photo_img = e.target.files[0];
          setFormData((prevData) => ({ ...prevData, photo_img: photo_img }));
      };
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (!formData.photo_title) {
                // Tangani kesalahan validasi, misalnya, tampilkan pesan kepada pengguna
                alert('Silakan isi photo title');
                return;
              }

            const formDataPost = new FormData();
            formDataPost.append('photo_title', formData.photo_title);
            formDataPost.append('description', formData.description);
            formDataPost.append('photo_img', formData.photo_img);
      
              // Gunakan createWarehouse tanpa FormData
              await createPhoto(formDataPost);
          
              // Atur ulang formulir setelah pengiriman berhasil
              setFormData({
                photo_title: "",
                description: "",
                photo_img: null
              });

              console.log(formDataPost.get('photo_img'));
              
              // Tangani kesuksesan, misalnya, tutup modal
              closeModal();
              
              // Reload halaman setelah sukses membuat gudang
              reloadData()
            } catch (error) {
              // Tangani kesalahan, tampilkan pesan kesalahan yang ramah pengguna
              console.error('Gagal menambahkan task', error);
              // Anda mungkin juga ingin menampilkan pesan kesalahan kepada pengguna
            }
      }    

    return (
        <div className="fixed  inset-0 z-50 flex items-center justify-center">
	<div className="absolute bg-gray-500 opacity-60 inset-0 z-0"></div>
	<div className="sm:max-w-lg w-full p-7 bg-gray-800 rounded-xl z-10">
    <button
            onClick={() => {
              closeModal()
            }}
            className="text-white text-2xl hover:text-white font-bold"
          >
            X
          </button>
		<div className="text-center">
			<h2 className="mt-5 text-3xl font-bold text-white">
				Upload Make Fun!
			</h2>
			<p className="mt-2 text-sm text-white">upload best photo you have.</p>
		</div>
        <form className="mt-8 space-y-3" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-white tracking-wide">Title</label>
                            <input 
                            id="photo_title"
                            name="photo_title"
                            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" 
                            value={formData.photo_title}
                            onChange={handleInputChange} 
                            placeholder="Title" 
                            />
                        <label className="text-sm font-bold text-white tracking-wide">Description</label>
                            <input 
                            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            id="description"
                            name="description" 
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description" 
                            />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-white tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-white hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-white dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-white dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input 
                            id="dropzone-file" 
                            type="file" 
                            className="hidden"
                            name="photo_img"
                            accept="image/*"
                            onChange={handleImageChange} />
                        </label>
                            {/* <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                    </div>
                                    <p className="pointer-none text-white "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input 
                                type="file" 
                                className="hidden" 
                                name="photo_img"
                                accept="image/*"
                                onChange={handleImageChange}  
                                />
                            </label> */}
                        </div>
                    </div>
                            <p className="text-sm text-gray-300">
                                <span>File type: jpg,jpeg,png of images</span>
                            </p>
                    <div>
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                    </div>
        </form>
	</div>
</div>

    )
}

export default AddPhoto;