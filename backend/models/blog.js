const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['live', 'draft', 'closed'], required: true },
})

module.exports = mongoose.model('Blog', BlogSchema)
