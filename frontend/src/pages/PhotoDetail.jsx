import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createComment, getCommentByPhoto } from "../modules/fetch/comment";
import { useEffect, useState } from "react";
import back from "../assets/back.png";
import like from "../assets/love.png";
import { createLike, deleteLike, getLikeByPhoto } from "../modules/fetch/like";
import Cookies from "js-cookie";

function PhotoDetail() {
  const location = useLocation();
  const { fromHome } = location.state;
  let photo = fromHome.photo;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const [dataComment, setDataComment] = useState([])
  const [dataLike, setDataLike] = useState([])
  const [likesCount, setLikesCount] = useState(0); // State untuk menyimpan jumlah like
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null)

  const userId = Cookies.get("userId")

  // Memeriksa apakah photo telah didefinisikan
  if (!fromHome) {
    return <div>Photo not found</div>; // Tampilkan pesan jika photo tidak ditemukan
  }

  const [formData, setFormData] = useState({
    comment_text: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

  try {
   
    // Gunakan createWarehouse tanpa FormData
    await createComment(photo.photo_id, formData);

    // Atur ulang formulir setelah pengiriman berhasil
    setFormData({
      comment_text: ""
    });

    // Reload halaman setelah sukses membuat gudang
    fetchDataComment(photo.photo_id)
  } catch (error) {
    // Tangani kesalahan, tampilkan pesan kesalahan yang ramah pengguna
    console.error('Gagal menambahkan comment', error);
    // Anda mungkin juga ingin menampilkan pesan kesalahan kepada pengguna
  }
};
  // console.log(dataLike)

  const handleLike = async () => {
    try {
      if (liked == true) {
        // Jika sudah menyukai, hapus like
        await deleteLike(likeId);
        setLikesCount((prevLikes) => prevLikes - 1);
        setLiked(false);
        // setLikeId(null); // Clear likeId after deleting the like
      } else {
        // Jika belum menyukai, tambahkan like
        const likeCreate=  await createLike(photo.photo_id);
        const likeId = likeCreate.like.like_id
        setLikesCount((prevLikes) => prevLikes + 1);
        setLiked(true);
        setLikeId(likeId)
      }
      // console.log(likeId)
      fetchDataLike();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Mencegah default "submit" perilaku formulir
      handleFormSubmit(event); // Panggil fungsi untuk mengirim formulir
    }
  };

  const fetchDataLike = async () => {
    try {
      const response = await getLikeByPhoto(photo.photo_id);
      setDataLike(response);
  
      setLiked(response.some((like) => like.user_id == userId));

      setLikesCount(response.length);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  const fetchDataComment = (id) => {
    getCommentByPhoto(id)
    .then((result) => {
      setDataComment([...result.commentOnPhoto])
    })
  }

  useEffect(() => {
    fetchDataComment(photo.photo_id)
    fetchDataLike(photo.photo_id)
  },[photo.photo_id])

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex flex-wrap min-h-[100vh] w-full content-center justify-center bg-gray-200 pt-10">
        <div className="flex">
          <div className="relative flex flex-wrap content-center justify-center " key={photo.photo_id}>
            <button onClick={handleGoBack} className="text-black absolute inset-x-0 top-3 left-4 z-10">
              <img src={back} alt="" className="h-10 w-10"/>
            </button>
            <img
              src={`http://localhost:3000/${photo.photo_img}`}
              alt=""
              className="rounded-l-2xl w-full h-[40rem] object-cover"
              />
          </div>
          
          <div className="relative flex justify-center rounded-r-2xl bg-white w-96 h-[40rem]">
            <div className="absolute inset-x-10 top-8 p-0">
              <div className="flex justify-start flex-row ">
              <img src={`http://localhost:3000/${photo.users.image}`} alt="" className="h-12 w-12 rounded-full mr-2 " />
              <p className="text-left text-lg mt-2">{photo.users.username}</p>
            </div>
              <p className="text-center font-bold">{photo.photo_title}</p>
              <div className="flex items-center justify-between w- mt-3">
              <button onClick={handleLike} className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}>
                {liked ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="25px"
                    width="25px"
                    >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="25px"
                    width="25px"
                    >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                    )}
                  <span>{likesCount}</span>
                  </button>
                {dataLike.map((like) => (
              <div key={like.like_id}>
                <ul>
                  <li>{like.users.username}</li>
                </ul>
              </div>
                  ))}
              {/* <button onClick={() => window.history.back()} className="text-gray-500">Back</button> */}
            </div>
              {/* <p className="text-center text-sm font-thin">{photo.description}</p> */}
            </div>
            <div className="absolute inset-x-10 top-36 rounded-xl shadow-2xl overflow-x-auto h-96 no-scrollbar">
            {dataComment.map((comment) => (
            <div key={comment.comment_id} className="flex flex-row p-4 shadow-lg">
            <img src={`http://localhost:3000/${comment.users.image}`} alt="" className="h-10 w-10 rounded-full mr-2 mt-2" />
            <div className="flex flex-col">
              <span className="text-gray-700 font-bold">{comment.users.username}</span>
              <span className="text-gray-700">{comment.comment_text}</span>
            </div>
          </div>
          ))}
          </div>
            <div className="absolute inset-x-10 bottom-0 p-4">
              <form onSubmit={handleFormSubmit}>
              <h1 className="text-l text-center font-semibold">comment disini</h1>
              <div className="text-gray-400">
              <input name="comment_text" id="comment_text" type="text" placeholder="Komen Disini" className="block w-full h-10 p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.comment_text}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} />
            {/* <button
            type="submit"
            onClick={() => console.log("Add Task clicked")} // Gantilah dengan fungsi atau tindakan yang sesuai
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            ADD
          </button> */}
              </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;
