import axios from 'axios';
import { setAlert } from '../alertActions';
import { GET_BLOGS, ADD_BLOG, DELETE_BLOG, BLOG_ERROR } from '../type';

export const getBlog = () => async dispatch => {
    try {
        const res = await axios.get('/api/blogs');

        dispatch({
            type: GET_BLOGS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const addBlog = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/blogs', formData, config);

        dispatch({
            type: ADD_BLOG,
            payload: res.data
        });

        dispatch(setAlert('Blog Added', 'success'));
    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const updateBlog = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`/api/blogs/${id}`, formData, config);

        dispatch({
            type: UPDATE_BLOG,
            payload: res.data
        });

        dispatch(setAlert('Blog Updated', 'success'));
    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const deleteBlog = id => async dispatch => {
    try {
        await axios.delete(`/api/blogs/${id}`);

        dispatch({
            type: DELETE_BLOG,
            payload: id
        });

        dispatch(setAlert('Blog Deleted', 'success'));
    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};