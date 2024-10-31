
var express = require("express");
var mongoClient = require('mongodb').MongoClient;
var cors = require('cors');



var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


var conStr = 'mongodb://127.0.0.1:27017'

app.get('/get-users', (req, res)=>{
   mongoClient.connect(conStr).then(clientObj => {
     var database = clientObj.db('videoLibrary');
     database.collection('users').find({}).toArray().then(documents => {
        res.send(documents);
        res.end();
     })
   })    
})

app.get('/get-admin', (req, res)=>{
    mongoClient.connect(conStr).then(clientObj => {
      var database = clientObj.db('videoLibrary');
      database.collection('admins').find({}).toArray().then(documents => {
         res.send(documents);
         res.end();
      })
    })    
 })

app.get('/get-videos', (req, res)=>{
    mongoClient.connect(conStr).then(clientObj => {
      var database = clientObj.db('videoLibrary');
      database.collection('videos').find({}).toArray().then(documents => {
         res.send(documents);
         res.end();
      })
    })    
 })

 app.get('/get-videos/:Category', (req, res)=>{
    mongoClient.connect(conStr).then(clientObj => {
      var database = clientObj.db('videoLibrary');
      database.collection('videos').find({Category:req.params.Category}).toArray().then(documents => {
         res.send(documents);
         res.end();
      })
    })    
 })

 app.get('/get-video/:id', (req, res)=>{
    mongoClient.connect(conStr).then(clientObj => {
      var database = clientObj.db('videoLibrary');
      database.collection('videos').find({VideoId: parseInt(req.params.id)}).toArray().then(documents => {
         res.send(documents);
         res.end();
      })
    })    
 })

 app.get('/get-favourites/:email', (req, res)=>{
    mongoClient.connect(conStr).then(clientObj => {
      var database = clientObj.db('videoLibrary');
      database.collection('favouritesVideo').find({Email: req.params.email}).toArray().then(documents => {
         res.send(documents);
         res.end();
      })
    })    
 })


app.post('/add-video', (req, res) => {

    let video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Description: req.body.Description,
        Url: req.body.Url,
        Views: parseInt(req.body.Views),
        Like: parseInt(req.body.Like),
        Dislike: parseInt(req.body.Dislike),
        Comments: [req.body.Comments],
        Category: req.body.Category
    }

    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db('videoLibrary');
        database.collection('videos').insertOne(video).then(()=>{
            console.log('Video Added!');
            res.end();
        })
    })
})

app.put('/edit-video/:id', (req, res) => {
    let editedVideo = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Description: req.body.Description,
        Url: req.body.Url,
        Views: parseInt(req.body.Views),
        Like: parseInt(req.body.Like),
        Dislike: parseInt(req.body.Dislike),
        Comments: [req.body.Comments],
        Category: req.body.Category
    }
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db('videoLibrary');
        database.collection('videos').updateOne({VideoId:parseInt(req.params.id)}, {$set: editedVideo} ).then(()=>{
            console.log('Video Edited!');
            res.end();
        })
    })
})

app.delete('/delete-video/:id', (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db('videoLibrary');
        database.collection('videos').deleteOne({VideoId: parseInt(req.params.id)}).then(()=>{
            console.log('Video Deleted!');  
            res.end();                
        })
    })
})

app.get('/get-categories', (req, res)=>{
    mongoClient.connect(conStr).then(clientObj => {
      var database = clientObj.db('videoLibrary');
      database.collection('categories').find({}).toArray().then(documents => {
         res.send(documents);
         res.end();
      })
    })    
 })


app.post('/add-user', (req, res)=>{
    let user = {
        UserId: req.body.UserId,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db('videoLibrary');
        database.collection('users').insertOne(user).then(()=>{
            console.log('User Registered!');
            res.end();
        })
    })
})

app.post('/add-category', (req, res)=>{
    let category = {
       CategoryId: parseInt(req.body.CategoryId),
       Category: req.body.Category
    }
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db('videoLibrary');
        database.collection('categories').insertOne(category).then(()=>{
            console.log('Category Register!');
            res.end();
        })
    })
})

app.post('/add-to-favourites/', (req, res)=>{
   let video ={
    VideoId: req.body.VideoId,
    Email: req.body.Email
   }
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db('videoLibrary');
        database.collection('favouritesVideo').insertOne(video).then(()=>{
            console.log('favourites added!');
            res.end();
        })
    })
})


app.listen(2200, () => {console.log("Server is listening on port 2200")});