const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    body: {
        type: String,
        required: "Body is required",
        trim: true
    },
    authorId: {
        type: ObjectId,
        ref: 'author',
        required: "Author id is required"
    },
    publishedAt: {type: Date, default: false},
    deletedAt:{type: Date, default: false},
    tags: [{type: String, trim: true}],
    category: {
        type: String,
        required: "Category is required",
        trim: true,
    },
    subcategory: [{type: String, trim:true}],
    isDeleted: {
        type: Boolean,
        default: false
    },
   
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("Blog", BlogSchema)

