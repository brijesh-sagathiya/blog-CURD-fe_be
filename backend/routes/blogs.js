const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController')

router.post('/', auth, createBlog)
router.get('/', auth, getBlogs)
router.get('/:id', auth, getBlogById)
router.put('/:id', auth, updateBlog)
router.delete('/:id', auth, deleteBlog)

module.exports = router
