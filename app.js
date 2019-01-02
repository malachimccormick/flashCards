const express=require('express');
const bodyParser=require('body-parser')//needed to receive post requests
const MongoClient=require('mongodb').MongoClient
const app=express()

let ObjectId=require('mongodb').ObjectID;
let db;
let flash;

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/flash_public/'))

MongoClient.connect('mongodb://Sandbox:Sandbox1@ds053156.mlab.com:53156/flashcards', (err, database) => {
    error(err)
        db = database.db('flashcards')
            app.listen(3000, function(){
        console.log("listening on port 3000")
    })
})

app.get('/',(req,res)=>{
    let curser= db.collection('flashcards').find().toArray(function(err,results){
        error(err)
            flash= results
        res.render('index')
    }) 
    
    })

app.post('/addcard', (req,res)=>{
    db.collection('flashcards').save(req.body,(err,result)=>{
        error(err)
        console.log(req)
    res.redirect('/')
    })
})

app.get('/addcard', (req, res) => {
    res.send(flash)
})
app.put('/changecard', (req,res)=>{
    db.collection('flashcards').updateOne(req.body,(err,results)=>{
        error(err)
            
        console.log("data changed")
        res.redirect('/')
    })
})
app.get('/changecard', (req, res) => {
    res.send(flash)
})
app.delete('/deletecard/:id', (req, res, next) => {
    let id = {
        _id: ObjectID(req.params.id)
    }
    db.collection('flashcards').update({
            _id: id
        }),
        error()
        res.redirect('/')
})

function error(err){
    if(err) return console.log(err)
}
