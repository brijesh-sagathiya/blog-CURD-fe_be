import { GET_BLOGS, ADD_BLOG, DELETE_BLOG, BLOG_ERROR } from '../actions/types';

const initialState = {
    blogs: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: payload,
                loading: false
            };
        case ADD_BLOG:
            return {
                ...state,
                blogs: [payload, ...state.blogs],
                loading: false
            };
        case DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== payload),
                loading: false
            };
        case BLOG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
