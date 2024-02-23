import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSpecificUser } from "../modules/fetch/user";
import { getAllPhotoByUser } from "../modules/fetch/photo";
import EditProfile from "../components/EditProfile";
import { Link } from "react-router-dom";

function ProfileUser () {

    const [dataUser, setDataUser] = useState([])
    const [postUser, setPostUser] = useState([])
    const [modalEdit, setModalEdit] = useState(false)

    const openModal = () => {
        setModalEdit(true)
    }

    const closeModal = () => {
        setModalEdit(false)
    }

    const fetchUserData = async () => {
        const result = await getSpecificUser()
          setDataUser(result.user)
      }

    const fetchPostUser = () => {
        getAllPhotoByUser()
        .then((result) => {
            setPostUser([...result.photo])
        })
    }

    useEffect(() => {
        fetchUserData();
        fetchPostUser()
      }, []);

    return (
        <div>
        <div>
        <Navbar postProfile={fetchPostUser} profile={fetchUserData} />
        </div>
         {/* <!-- component --> */}
        <div className="relative max-w-2xl mx-auto mt-24">
    
        {/* <!-- top header --> */}
        <div className="flex flex-col justify-center items-center my-5">
            <div className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full" style={{backgroundImage: dataUser && dataUser.image ? `url(http://localhost:3000/${dataUser.image})` : 'none', backgroundSize: "cover"}}></div>
            <span className="my-3">{dataUser.username}</span>

            <div className="flex gap-10 text-sm">
                <div className="flex flex-col items-center">
                    <span className="font-bold">10</span>
                    <span>Following</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold">1.20 K</span>
                    <span>Followers</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold">100 K</span>
                    <span>Likes</span>
                </div>
            </div>

            <button onClick={() => openModal(dataUser)} className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400">Edit profile</button>

        </div>
        {/* <!-- top header end --> */}


        {/* <!-- middle navigation --> */}
        <div className="grid grid-cols-4">
            <button className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="border-b-2 border-gray-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            </button>
            <button className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </button>
            <button className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            </button>
            <button className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>
        {/* <!-- middle navigation end --> */}

        {/* <!-- video grid --> */}
        <div className="grid grid-cols-4 gap-0.5 mt-2">

        {postUser.map((photo) => (
            
            <div className="relative w-full h-60" key={photo.photo_id}>
                <Link to={`/photo/${photo.photo_id}`} state={{ fromHome: { photo } }}>
                <img src={`http://localhost:3000/${photo.photo_img}`} alt="" className="object-cover w-[100%] h-[100%]" />
                </Link>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                >
                    <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                </svg>
                    <span>800</span>
                </div>
            </div>
            ))}
            {/* <!-- small player with views end --> */}
            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://i.pinimg.com/originals/05/d3/80/05d38056f155a2e852691a62546413cf.gif)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

                {/* <!-- small player with views --> */}
            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://cdn.acidcow.com/pics/20190628/gifs_14.gif)`}}>
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://www.allkpop.com/upload/2021/06/comment/260124/1624685055-tumblr-72b06bab00d71145f9900a3bdd40a288-e6d20803-500.gif)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
                {/* <!-- small player with views end --> */}
            </div>

            {/* <!-- ///////////// --> */}

                {/* <!-- small player with views --> */}
            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://media0.giphy.com/media/5tujxS8BprYWkDzjXM/giphy.gif?cid=790b7611f58c0b916eb59574df025c7ca891a396c6176d14&rid=giphy.gif&ct=g)`}}>
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

                {/* <!-- small player with views --> */}
            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://i.pinimg.com/originals/a7/9e/bb/a79ebb256a2e8b450f6d29d813a538bf.gif)`}}>
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://media3.giphy.com/media/daOQ5lE52dUhgD8acn/giphy.gif?cid=790b7611359354d7bdfe94465e3f7a6dc892e92e85b0da7e&rid=giphy.gif&ct=g)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://media2.giphy.com/media/GMKSiOWWSyRv1P0G0s/giphy.gif?cid=790b76117872dd4d66aab9bcec13817a9ce1043478fbcc59&rid=giphy.gif&ct=g)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}
            
            {/* <!-- //////////// --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://66.media.tumblr.com/ec902eca6ef176851823e29314d56ede/f90bf85c8b66de71-3a/s400x600/419ad07f433f14b8851af32ecedc2ea0f64e1a18.gif)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://media4.giphy.com/media/lnPEWRyHHQhKuFsNLo/giphy.gif?cid=790b76115514496b47f0100da633cdce8e29f904cea6f308&rid=giphy.gif&ct=g)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://c.tenor.com/ooA0qXfBTUEAAAAM/dog-tiktok.gif)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

            <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('https://64.media.tumblr.com/6407088ae4b520c36b0ca6f06cdbf8e3/7e615472c8228ae9-ba/s400x600/dba5fd9c77b1dd419a6bbe6c3ac73357ce7eebb8.gifv)`}}>
                {/* <!-- small player with views --> */}
                <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>800</span>
                </div>
            </div>
                {/* <!-- small player with views end --> */}

        </div>
        {/* <!-- video grid end --> */}

        {modalEdit && (
        <EditProfile user={dataUser} closeModal={closeModal} />
        )}
    </div>
    </div>
    )
}

export default ProfileUser;