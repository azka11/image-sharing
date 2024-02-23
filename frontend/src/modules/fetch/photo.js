import { instance } from '../axios/index';

async function getAllPhoto() {
    try {
        const response = await instance.get('/photo');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getAllPhotoByUser() {
    try {
        const response = await instance.get(`/photo/user`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function searchPhoto(searchTerm) {
    try {
        const response = await instance.post('/photo/search', { searchTerm });
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getPhotoById(photo_id) {
    try {
        const response = await instance.get(`/photo/${photo_id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createPhoto(formDataPost) {
    try {
        const response = await instance.post('/photo/create', formDataPost, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deletePhoto(photo_id) {
    try {
        const response = await instance.delete(`photo/${photo_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllPhoto, getAllPhotoByUser, getPhotoById, searchPhoto, createPhoto, deletePhoto }