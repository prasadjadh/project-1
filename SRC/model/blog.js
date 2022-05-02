const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: 'author',
        required: true
    },
    publishedAt: Date,
    deletedAt: Date,
    tags: [String],
    category: {
        type: [String],
        required: true,
        validate: [(value) => value.length > 0, 'Category is mandatory']
    },
    subcategory: [String],
    isDeleted: {
        type: Boolean,
        default: false
    },
   
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("blogger", BlogSchema)

