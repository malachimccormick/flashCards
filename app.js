const express=require('express');
const bodyParser=require('body-parser')
const MongoClient=require('mongodb').MongoClient
const app=express()

let db;

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/flash_public/'))

MongoClient.connect('mongodb://Sandbox:Sandbox1@ds053156.mlab.com:53156/flashcards', (err, database) => {
    error(err)
    db = database.db('flashcards')
    app.listen(3000, function(){
        console.log("listening on port 3000")
    })
})
let flash;
let array;
app.get('/',(req,res)=>{
    
    let curser= db.collection('flashcards').find().toArray(function(err,results){
        error(err)
        flash= results
        // results.forEach(function(doc, err){
        //     error(err)
        //     array=doc
        //     console.log(array.question) //get all the questions because of for each
        res.render('index')
        })
        //  console.log(array.question)//get the last question in the array
        // res.render('index') //, {flash: array}
        //console.log()
      
    }
)
app.get('/addcard',(req,res)=>{
    res.send(flash)
})
app.post('/addcard', (req,res)=>{
    db.collection('flashcards').save(req.body,(err,result)=>{
    error(err)
    console.log('saved to database :)')
    res.redirect('/')
    })
})
function error(err){
if(err) return console.log(err)
}