
let card = 0
// $('.modal').hide(-300)
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
$('.hint').click(function(){
    $('.hint').hide(-100)
    $('.hintShow').show()
})
