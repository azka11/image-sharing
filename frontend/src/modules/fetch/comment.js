import { instance } from '../axios/index';

async function getAllComment() {
    try {
        const response = await instance.get('/comment');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getCommentById(comment_id) {
    try {
        const response = await instance.get(`/comment/${comment_id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getCommentByPhoto(id) {
    try {
        const response = await instance.get(`/comment/photo/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createComment(photo_id, formData) {
    try {
        const response = await instance.post(`/comment/create/${photo_id}`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateComment(comment_id, formData) {
    try {
        const response = await instance.post(`/comment/update/${comment_id}`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteComment(comment_id) {
    try {
        const response = await instance.delete(`comment/${comment_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllComment, getCommentById, getCommentByPhoto, createComment, updateComment, deleteComment }