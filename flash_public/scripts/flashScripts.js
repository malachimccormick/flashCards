$('#enter').click(function(){
    $('#cardQuestion').slideUp(-100)
    $('#cardAnswer').slideDown(250)
})
$('#back').click(function(){
    $('#cardAnswer').slideUp(-100)
    $('#cardQuestion').slideDown(250)
})