import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPhoto, getPhotoById } from "../modules/fetch/photo";
import Navbar from "../components/Navbar";
import { searchPhoto } from "../modules/fetch/photo";

function HomePage() {

    const [allData, setAllData] = useState([])
    const [searchResult, setSearchResult] = useState([]);

    const fetchAllData = () => {
        getAllPhoto()
        .then((result) => {
            const newData = result.photo.map((photo) => ({
                ...photo,
                username: photo.users.username,
                image: photo.users.image,
              }));
              setAllData(newData);
        })
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    const handleSearch = async (searchTerm) => {
        try {
            const response = await searchPhoto(searchTerm);
            setSearchResult(response.photo);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    return (
        <>
        <div>
      <Navbar reloadData={fetchAllData} onSearch={handleSearch} />
        </div>
       
        <div className="mx-auto max-w-screen-xl px-2 py-20">
        <div className="columns-1 gap-3 sm:columns-2 sm:gap-5 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 ">
        {searchResult.length > 0
                        ? searchResult.map((photo) => (
                              <Link
                                  key={photo.photo_id}
                                  to={`/photo/${photo.photo_id}`}
                                  state={{ fromHome: { photo } }}
                              >
                                  <div className="relative overflow-hidden rounded-xl shadow-md">
                                      <img
                                          src={`http://localhost:3000/${photo.photo_img}`}
                                          alt=""
                                          className="rounded-xl mt-4 w-full h-auto grayscale-0 hover:grayscale transition duration-300"
                                      />
                                  </div>
                              </Link>
                          ))
                        :
            allData.map((photo) => (
               <Link key={photo.photo_id} to={`/photo/${photo.photo_id}`} state={{ fromHome: { photo } }}>
                 <div className="relative overflow-hidden rounded-xl shadow-md">
                    <img src={`http://localhost:3000/${photo.photo_img}`} alt="" className=" rounded-xl mt-4 w-full h-auto grayscale-0 hover:grayscale transition duration-300" />
                </div>
                </Link>
                
            ))}
            
        </div>
        </div>
        </>
    )
}

export default HomePage;