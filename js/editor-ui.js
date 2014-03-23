var loadBitsOfUI = function() {
  $('body').addClass('step3');
  $('body').addClass('step4');
  $('body').addClass('step5');
}

var attachEventsOnce = function() {
  /* On click to the ADD button */
  $('#add').click(function(e){
    var promptedTitle = prompt('What is your slide\'s title?');
    var promptedBody = prompt('What is your slide\'s body?');
    var calculatedPosition = parseInt($('#slides .slide:last-child').attr('data-order'))+1000;

    // TODO : inserting this new slide
    slidesTable.insert({title: promptedTitle, body: promptedBody, position: calculatedPosition, disabled: false});


    e.preventDefault();
  });


  /* On submission of the form in the EDIT modal */
  $('form#modalbox-form').submit(function(e){
    var id = $('#modalbox #modal_id').html();
    var title = $('#modalbox #modal_title').val();
    var body = $('#modalbox #modal_body').val();
    var position = $('#modalbox #modal_position').val();

    // TODO: updating the slide at `id`
    slidesTable.get(id).update({title: title, body: body, position: position});

    $('#modalbox').modalBox('close');
    e.preventDefault();
  });
}


var attachEventsOnSlideAdd = function(slide){
  var id = slide.attr('id');

  /* On click to a DELETE button */
  $('.delete', slide).click(function(e){
    if(confirm('Are you sure you want to delete this slide?')) {

      // TODO : deleting the slide at `id`
      slidesTable.get(id).deleteRecord();


    }
    e.preventDefault();
  });


  /* On click to toggle button */
  $('.toggle', slide).click(function(e){
    var isDisabled = slide.hasClass('disabled');
    if(isDisabled) {

      // TODO : enable the slide at `id`
      slidesTable.get(id).set('disabled', false);

    } else {

      // TODO : disable this slide at `id`
      slidesTable.get(id).set('disabled', true);


    }
    e.preventDefault();
  });

}
