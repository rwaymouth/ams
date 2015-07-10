
$('.input--toggle').on('click', function showModal(){
    $('.modal').toggleClass('hidden');
});

$('.modal--cancel').on('click', function hideModal(e) {
    e.preventDefault();
    $('.modal').addClass('hidden');
});
