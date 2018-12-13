const express=require('express');
const bodyParser=require('body-parser')
const MongoClient=require('mongodb').MongoClient
const app=express()

let db;

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/flash_public/'))

MongoClient.connect('mongodb://Sandbox:Sandbox1@ds155130.mlab.com:55130/mqoutes', (err, database)=>{
    error(err)
    db = database.db('mqoutes')
    app.listen(3000, function(){
        console.log("listening on port 3000")
    })
})

app.get('/',(req,res)=>{
    // let curser= db.collection('flashcards').toFind().toArray(function(err,results){
    //     error(err)
    //     console.log(results)
        res.render('index.pug')
    // })
})
app.post('/flashCards', (req,res)=>{
    // db.collection('flashcards').save(req.body,(err,result)=>{
    // error(err)
    // console.log('saved to database :)')
    res.redirect('/')
    // })
})
function error(err){
if(err) return console.log(err)
}