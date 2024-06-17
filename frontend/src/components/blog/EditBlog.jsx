import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBlog, updateBlog } from '../../actions/blogActions';
import PropTypes from 'prop-types';

const EditBlog = ({ getBlogs, updateBlog, blog, match, history }) => {
    const [formData, setFormData] = useState({
        blog_title: '',
        blog_image: '',
        blog_description: '',
        blog_status: 'draft'
    });

    const { blog_title, blog_image, blog_description, blog_status } = formData;

    useEffect(() => {
        if (match.params.id) {
            getBlogs(match.params.id);
        }
        if (blog) {
            setFormData({
                blog_title: blog.blog_title || '',
                blog_image: blog.blog_image || '',
                blog_description: blog.blog_description || '',
                blog_status: blog.blog_status || 'draft'
            });
        }
    }, [getBlog, match.params.id, blog]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateBlog(match.params.id, formData);
        history.push('/blogs');
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Title" name="blog_title" value={blog_title} onChange={onChange} required />
            <input type="text" placeholder="Image URL" name="blog_image" value={blog_image} onChange={onChange} required />
            <textarea placeholder="Description" name="blog_description" value={blog_description} onChange={onChange} required></textarea>
            <select name="blog_status" value={blog_status} onChange={onChange} required>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>
            <button type="submit">Update</button>
        </form>
    );
};

EditBlog.propTypes = {
    getBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired,
    blog: PropTypes.object,
};

const mapStateToProps = state => ({
    blog: state.blogs.blog
});

export default connect(mapStateToProps, { getBlog, updateBlog })(EditBlog);
