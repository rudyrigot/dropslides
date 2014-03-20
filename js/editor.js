/* Initializing the table's variable as global, in order to use it in the console during the demo */
var slidesTable;

// this function takes a slide objectm and templates it and inserts it at the right place
var insertSlideIntoDom = function(slide) {
  $('#slides').insertinorder(
    _.template($('#slide-template').html(), { slide: slide }), // the slide
    slide.get("position")
  );
  attachEventsOnSlideAdd($('#'+slide.getId()));
}

// this function allows to open a modal asking the new features of the slide, and returns them in the callback
var editSlideModal = function(slide, callback){
  $(document).off('confirm', '.remodal');
  $('body').append(_.template($('#modal-template').html()));
  $('[data-remodal-id=modal] #modal_title').val($('section h2', slide).html());
  $('[data-remodal-id=modal] #modal_body').val($('section p', slide).html());
  $('[data-remodal-id=modal] #modal_position').val(slide.attr('data-order'));
  $('[data-remodal-id=modal] #modal_id').html(slide.attr('id'));
  $('[data-remodal-id=modal]').remodal({ "hashTracking": false }).open();
  console.log($('form#remodal-form'))
  $('form#remodal-form #remodal-submit').click(function(e){
    callback(
      slide.attr('id'),
      $('[data-remodal-id=modal] #modal_title').val(),
      $('[data-remodal-id=modal] #modal_body').val(),
      $('[data-remodal-id=modal] #modal_position').val()
    );
    e.preventDefault();
  });
}

$(function(){
  var client = new Dropbox.Client({key: 'vaf87jf4vtix0jz'});

  /* Try to finish OAuth authorization with the Dropbox API */
  client.authenticate({}, function (error) {
    if (error) {
      alert('Authentication error: ' + error);
    }
  });

  if (client.isAuthenticated()) {

    /* Client is authenticated: getting the datastore for this particular application */
    var datastoreManager = client.getDatastoreManager();
    datastoreManager.openDefaultDatastore(function (error, datastore) {
      if (error) {
        alert('Error opening default datastore: ' + error);
      }

      /* Datastore acquired! Getting the slides table */
      slidesTable = datastore.getTable('slides');

      /* Syncing */
      datastore.recordsChanged.addListener(function (event) {
        _.each(event.affectedRecordsForTable('slides'), function(record){
          // in all cases: remove if exists
          if ($('#'+record.getId()).length > 0) {
            $('#'+record.getId()).remove();
          }
          // if create or update: reinsert
          if (!record.isDeleted()) {
            insertSlideIntoDom(record);
          }
        });
      });

      /* And for each slide queried, inserting it in the DOM, in order */
      _.each(slidesTable.query(), insertSlideIntoDom);

      loadBitsOfUI();

      attachEventsOnce();

    });

  }
});
