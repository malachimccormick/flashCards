let card = 0
// $('.modal').hide(-300)
$(document).ready(function(){
    flashData()
})
$('#enter').click(function(){
    $('#cardQuestion').slideUp(-100)
    $('#cardAnswer').slideDown(250)
    
    })

$('#back').click(function(){
$('#cardAnswer').slideUp(-100)
    $('#cardQuestion').slideDown(250)
})

$('#next').click(function(){
    $('#cardAnswer').slideUp(-100)
    $('#cardQuestion').slideDown(250)
    $('.hintShow').hide()
        $('.hint').show()
    
              flashData()


})

$('#addNew').click(function(){
    $('.modal').show()
    $('#addNew').hide()
})

$('#submit').click(function(){
    card ++
    $('#addNew').show()
    $('.modal').hide()
    $('#contentAdded').show().html('You added ' + card + ' cards')
    document.getElementById('contentAdded')
})

$('#cancel').click(function(){
    $('.modal').hide()
    $('#addNew').show()
})

$('.hint').click(function(data){
    $('.hint').hide(-100)
    $('.hintShow').show()
})
var array = localStorage.getItem("array ");

console.log(flash)
flash = `${flash}`

console.log(flash)

function flashData(){
   $.ajax({
       type: 'GET',
       url: '/addcard',
       success: function (data) {
           console.log(data)
           for (i = 0; i < data.length; i++) {
               console.log(data)
               $('.question').html(data[i].question);
               $('.hintShow').html(data[i].hint)
               $('.answer').html(data[i].answer)
           }
       },
       error: function (err) {
           console.log(err)
       }

   });
}