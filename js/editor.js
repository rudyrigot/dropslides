/* Initializing the table's variable as global, in order to use it in the console during the demo */
var slidesTable;

var insertSlideIntoDom = function(slide) {
  $('#slides').insertinorder(
    _.template($('#slide-template').html(), { slide: slide }), // the slide
    slide.get("position")
  );
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

    });

  }
});
