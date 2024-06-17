const Blog = require('../models/blog')
const upload = require('../middleware/multer')

exports.createBlog = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err })
        }
        const { title, description, status } = req.body

        if (!title || !description || !status) {
            return res
                .status(400)
                .json({ msg: 'Please include all required fields' })
        }

        const image = req.file ? req.file.path : ''
        if (!image) {
            return res.status(400).json({ msg: 'Image is required' })
        }

        try {
            const newBlog = new Blog({
                title,
                description,
                author: req.user.id,
                image,
                status,
            })

            const blog = await newBlog.save()
            res.json({ message: 'Blog cerated' })
        } catch (err) {
            console.log(err)
            res.status(500).send('Server error')
        }
    })
}

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id })
        const fullUrl = req.protocol + '://' + req.get('host')

        const blogsWithImageUrls = blogs.map((blog) => {
            return {
                ...blog._doc,
                image: `${fullUrl}/${blog.image}`,
            }
        })

        res.json(blogsWithImageUrls)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) return res.status(404).json({ msg: 'Blog not found' })

        const fullUrl = req.protocol + '://' + req.get('host')
        const blogWithImageUrl = {
            ...blog._doc,
            image: `${fullUrl}/uploads/${blog.image}`,
        }

        res.json(blogWithImageUrl)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

exports.updateBlog = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err })
        }

        const { title, description, status } = req.body
        const image = req.file ? req.file.path : null

        try {
            let blog = await Blog.findById(req.params.id)
            if (!blog) return res.status(404).json({ msg: 'Blog not found' })

            if (blog.author.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' })
            }

            const updatedFields = { title, description, status }
            if (image) {
                updatedFields.image = image
            }

            blog = await Blog.findByIdAndUpdate(req.params.id, updatedFields, {
                new: true,
            })

            res.json({ message: 'Blog updated' })
        } catch (err) {
            console.log(err)
            res.status(500).send('Server error')
        }
    })
}

exports.deleteBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id)
        if (!blog) return res.status(404).json({ msg: 'Blog not found' })

        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await Blog.findByIdAndRemove(req.params.id)

        res.json({ message: 'Blog removed' })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}
