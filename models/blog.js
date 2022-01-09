const mongoose = require('mongoose');
// const { stringify } = require('uuid');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: false
    },
    snippet:{
        type: String,
        required: true
    },
    getfile:{
        type: String,
        required: true
    },
    download:{
        type: String,
        required: false,
    },
    body:{
        type: String,
        required: true
    },

    
}, {timestamps:true});


const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;