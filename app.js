const express=require('express');
const bodyParser=require('body-parser')//needed to receive post requests
const app=express()
const MongoClient=require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID


let db;
let flash;

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/flash_public/'))

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
//creats new card
app.post('/addcard', (req, res) => {
    
    db.collection('flashcards').insertOne(req.body, (err, result) => {
        error(err)
        res.redirect('/')
    })
    //i messed up and had an id with a value of null. 
    //I used .remove to erase it and left it here incase it is needed again
    // db.collection('flashcards').remove({_id:null}, (err, result) => {
    //     error(err)
    //     console.log(req.body)
    //     console.log('updated database :)' + result)
    //     res.redirect('/')
    // })
})

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
                       