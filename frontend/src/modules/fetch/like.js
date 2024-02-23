import { instance } from '../axios/index';

async function getAllLike() {
    try {
        const response = await instance.get('/like');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getLikeById(like_id) {
    try {
        const response = await instance.get(`/like/${like_id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getLikeByPhoto(photo_id) {
    try {
        const response = await instance.get(`/like/photo/${photo_id}`);
        // console.log(response.data.likeOnPhoto)
        return response.data.likeOnPhoto
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createLike(photo_id) {
    try {
        const response = await instance.post('/like/create', {photo_id})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteLike(like_id) {
    try {
        const response = await instance.delete(`like/${like_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllLike, getLikeById, getLikeByPhoto, createLike, deleteLike }