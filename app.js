const express=require('express');
const bodyParser=require('body-parser')//needed to receive post requests
const app=express()
const MongoClient=require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID//important for update and delete by id


let db;
let flash;

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/flash_public/'))

//conect to mlab, mongodb
MongoClient.connect('mongodb://Sandbox:Sandbox1@ds053156.mlab.com:53156/flashcards',{ useNewUrlParser: true }, (err, database) => {
    error(err)
        db = database.db('flashcards')
            app.listen(3000, function(){
        console.log("listening on port 3000")
        
    })
})
//reads the data in the database
app.get('/',(req,res)=>{
    let curser= db.collection('flashcards').find().toArray(function(err,results){
        error(err)
            flash= results
        res.render('index')
    }) 
})

app.get('/addcard', (req, res) => {
    res.send(flash)
    
})
//used to create a new card
app.post('/addcard', (req, res) => {
    
    db.collection('flashcards').insertOne(req.body, (err, result) => {
        error(err)
        res.redirect('/')
    })
    //I messed up and had an id with a value of null and could not get to it. 
    //I used .remove to erase it and left it here incase it is needed again
    // db.collection('flashcards').remove({_id:null}, (err, result) => {
    //     error(err)
    //     console.log(req.body)
    //     console.log('item deleted from database :)' + result)
    //     res.redirect('/')
    // })
})
//used to update the database. There are other methods .replace, .updateMany
app.post('/update', (req, res) => {
     let newCard = {
        question: req.body.question,
        hint: req.body.hint,
        answer:req.body.answer
        }
    let id =req.body.id
    db.collection('flashcards').updateOne({_id:ObjectId(id)},{$set:newCard}, (err, result) => {
        error(err)
            res.redirect('/')
    })
})
//used to delete a post
app.post('/delete', (req, res) => {
    let id =req.body.id
        db.collection('flashcards').deleteOne({_id:ObjectId(id)}, (err, result) => {
            error(err)
                res.redirect('/')
    })
})            
    function error(err){
        if(err) return console.log(err)
    }
                       