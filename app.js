const express=require('express');
const bodyParser=require('body-parser')//needed to receive post requests
const app=express()
var mongoose = require('mongoose');
let port = 3000
//conect to mlab, mongodb
mongoose.connect('mongodb://Sandbox:Sandbox1@ds053156.mlab.com:53156/flashcards', { useMongoClient: true })
//mongoose.connect('mongodb://Sandbox:Sandbox@localhost:27017/mydb',{useMongoClient:true})
app.listen(port)
console.log('Listning on port '+port)
let Schema=mongoose.Schema;
let flashCardSchema = new Schema({
    question: {
        type: String,
        unique: true,
        require: true
    },
    hint: {
        type: String,
        unique: true,
        require: true
    },
    answer: {
        type: String,
        unique: true,
        require: true
    },
},{collection:'flashcards'});
let FlashCard= mongoose.model('FlashCard', flashCardSchema)



app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/flash_public/'))



//reads the data in the database
app.get('/',(req,res)=>{
   res.render('index')
})

app.get('/addcard', (req, res) => {
   
    FlashCard.find()
        .then(function (doc){
            console.log(doc)
            res.send(doc)
            
        })
    
})
//used to create a new card
app.post('/addcard', (req, res) => {
    let newCard = {
        question: req.body.question,
        hint: req.body.hint,
        answer: req.body.answer
    }
   let data = new FlashCard(newCard);
   data.save()
    res.redirect('/')
})
//used to update the database. There are other methods .replace, .updateMany
app.post('/update', (req, res) => {
    let id =req.body.id
  FlashCard.findById(id, function(err,doc){
      if (err){
          console.log('no entry found')
      }
      doc.question = req.body.question
      doc.hint = req.body.hint
      doc.answer = req.body.answer
      doc.save()
      res.redirect('/')
  })
})
//used to delete a post
app.post('/delete', (req, res) => {
    let id =req.body.id
    FlashCard.findByIdAndRemove(id).exec()
    res.redirect('/')
}) 

//     function error(err){
//         if(err) return console.log(err)
//     }
                       