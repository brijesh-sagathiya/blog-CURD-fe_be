import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addBlog } from '../../actions/blogActions';
import PropTypes from 'prop-types';

const AddBlog = ({ addBlog }) => {
    const [formData, setFormData] = useState({
        blog_title: '',
        blog_image: '',
        blog_description: '',
        blog_status: 'draft'
    });

    const { blog_title, blog_image, blog_description, blog_status } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addBlog(formData);
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
            <button type="submit">Submit</button>
        </form>
    );
};

AddBlog.propTypes = {
    addBlog: PropTypes.func.isRequired
};

export default connect(null, { addBlog })(AddBlog);
