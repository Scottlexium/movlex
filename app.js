const express = require("express");
const ProgressBar = require('progress')
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const dotenv = require("dotenv");
const multer = require('multer');
const fileupload = require ('express-fileupload');
const mongodb = require('mongodb');
const fs = require ('fs');
const path = require('path');
const { urlencoded } = require("express");


const app = express();
const binary = mongodb.Binary
app.set('view engine', 'ejs');
app.set('views', 'view');

dotenv.config();

const port = process.env.PORT || 4000;

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port);
        console.log(`Connected: Listening on port ${port}`);
    })
    .catch((err) => console.log(err));



app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))
// app.use(fileupload());

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)



// app.get('/', (req, res) => {
//     res.render('index', {title: 'Home', blogs});
// });

app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/blogs',(req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'New blogs', blogs: result})
    }).catch((err)=>{
        console.log(err);
    })
});


  
// SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/Images')
    },
    filename: (req, file, cb) => {
        console.log(file)
      cb(null,Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

let filename = "";

app.post('/uploadfile', upload.single('uploadedFile'), (req, res) => {
    filename = req.file.path;
    const newpath = filename.split('public').slice(0, 6).join('');
    console.log(`uploaded at ${newpath}`);
    res.render('create', {title: 'Create New Post', url: newpath});
    // res.render('create', {title: 'Create New Post', url: 'newpath' });
});














app.post('/blogs', (req, res) => {

    const blog = new Blog(req.body);
    blog.save()
    .then((result) =>{
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    });
    res.redirect('/');
})
// app.get('/create', (req, res)=>{
//     getFile(res);
// })



app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog with mongoose'});
    }).catch((err)=>{
        console.log(err);
    })
})


app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id;;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/'})
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});



app.get('/create' , upload.single('uploadedFile'), (req, res)=>{
    
    res.render('create', {title: 'Create New Post', url: filename});

    
})

app.get('/error', (req, res) => {
    res.render('404', {title: 'page not found'});
});

app.use((req, res)=>{
    res.status(400).render('404', {title: 'page not found'});
})

