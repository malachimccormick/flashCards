
    flashData()

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
    $('#addNew').show()
        $('.modal').hide()

})

$('#cancel').click(function(){
    $('.modal').hide()
        $('#addNew').show()
})

$('.hint').click(function(data){
    $('.hint').hide(-100)
        $('.hintShow').show()
})

function flashData(){
   $.ajax({
       type: 'GET',
       url: '/addcard',
       success: function (data) {
           console.log(data)
           placeInfo(data)
       },
       error: function (err) {
           console.log(err)
       }
   });
}
let i;
function placeInfo(data){
    i = Math.floor(Math.random() * 15)
    console.log(i)
    if(i >data.length){
        i=0
        } ; 
    $('.question').html(data[i].question);
        $('.hintShow').html(data[i].hint)
            $('.answer').html(data[i].answer)  
}
