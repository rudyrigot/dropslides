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
      var slidesTable = datastore.getTable('slides');

      /* And for each slide queried, inserting it in the DOM, in order */
      _.each(slidesTable.query(), function(slide){
        slide.deleteRecord();
      });

      _.each(newRecords, function(element){
        slidesTable.insert(element);
      });

      $('#result').html('Ok, presentation reinitialized');

    });

  }
});
