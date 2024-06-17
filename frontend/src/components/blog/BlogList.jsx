import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBlog, deleteBlog } from '../../actions/blogActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogList = ({ getBlogs, deleteBlog, blogs }) => {
    useEffect(() => {
        getBlogs();
    }, [getBlogs]);

    return (
        <div>
            <h1>Blogs</h1>
            <Link to="/add-blog">Add Blog</Link>
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id}>
                        <h2>{blog.blog_title}</h2>
                        <img src={blog.blog_image} alt={blog.blog_title} />
                        <p>{blog.blog_description}</p>
                        <p>Status: {blog.blog_status}</p>
                        <Link to={`/edit-blog/${blog._id}`}>Edit</Link>
                        <button onClick={() => deleteBlog(blog._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

BlogList.propTypes = {
    getBlogs: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    blogs: state.blogs.blogs
});

export default connect(mapStateToProps, { getBlog, deleteBlog })(BlogList);
