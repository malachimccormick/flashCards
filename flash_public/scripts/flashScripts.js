//Data is loaded when the page is loaded
flashData()
//All buttons start here
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
              flashData()//function to get the data called here
})

$('#addNew').click(function(){
    $('.modal').show()
    $('#modalContent').show()
        $('#modalPutContent').hide()
            $('#modalDeleteContent').hide()
                $('#addNew').hide()
})

$('#edit').click(function(){
    $('#modalContent').hide()
        $('#modalPutContent').show()
})

$('#delete').click(function () {
    $('#modalContent').hide()
        $('#modalDeleteContent').show()
})

$('#submitPut').click(function(){
    $('#addNew').show()
        $('.modal').hide()
        flashDataPut()
})
$('#submit').click(function () {
    $('#addNew').show()
        $('.modal').hide()

})

$('.cancel').click(function(){
    $('.modal').hide()
        $('#addNew').show()
})

$('.hint').click(function(data){
    $('.hint').hide(-100)
        $('.hintShow').show()
})
//The function that gets the data and places it in the proper location
let i;//i is used to iterate through the data
let id;

function flashData(){
   $.ajax({
       type: 'GET',
       url: '/addcard',
       success: function (data) {
           console.log(data)
           //i is randomized to make the questions random but not needed.
           //the questions can just go in order
           i = Math.floor(Math.random() * data.length)
                $('.question').html(data[i].question);
                $('.hintShow').html(data[i].hint)
                $('.answer').html(data[i].answer)
                id = data[i]._id
                
               console.log(id)
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    console.log(i)
   
    function flashDataPut(id) {
        $.ajax({
            
            type: 'GET',
            url: '/addcard/'+id,
            success: function (data) {
            console.log(data)
            //i is randomized to make the questions random but not needed.
            //the questions can just go in order
            i = Math.floor(Math.random() * data.length)
            $('.question').html(data[i].question);
            $('.hintShow').html(data[i].hint)
            $('.answer').html(data[i].answer)
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function flashDataDelete(id) {
    $.ajax({
        type: 'delete',
        url: '/addcard/'+id,
        success: function (data) {
            console.log(data)
            //i is randomized to make the questions random but not needed.
            //the questions can just go in order
            i = Math.floor(Math.random() * data.length)
            $('.question').html(data[i].question);
            $('.hintShow').html(data[i].hint)
            $('.answer').html(data[i].answer)
        },
        error: function (err) {
            console.log(err)
        }
    })
}
