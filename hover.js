$('.hover').on('mouseover', function() {
  $('#photo').addClass('dimmed');
}).on('mouseout', function() {
  $('#photo').removeClass('dimmed');
});
