var loadBitsOfUI = function() {
  $('body').addClass('step3');
}

var attachEventsOnce = function() {
  /* On click to the add button */
  $('#add').click(function(e){
    var promptedTitle = prompt('What is your slide\'s title?');
    var promptedBody = prompt('What is your slide\'s body?');
    var calculatedPosition = parseInt($('#slides .slide:last-child').attr('data-order'))+1000;

    // TODO : inserting this new slide
    slidesTable.insert({title: promptedTitle, body: promptedBody, position: calculatedPosition});

    e.preventDefault();
  });
}

var attachEventsOnSlideAdd = function(slide){
  var slideID = slide.attr('id');

  /* On click to a delete button */
  $('.delete', slide).click(function(e){
    if(confirm('Are you sure you want to delete this slide?')) {

      // TODO : deleting this slide
      slidesTable.get(slideID).deleteRecord();

    }
    e.preventDefault();
  });

}
