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

      var newRecords = [
        {
          title: '30 minutes to build a useful productivity app',
          body: '&hellip; with the awesome Dropbox Datastore API!',
          position: '1000',
          disabled: false
        },
        {
          title: 'What you know of Dropbox',
          body: '<img src="img/syncbox_transparent.png" style="background-color: white">',
          position: '2000',
          disabled: false
        },
        {
          title: 'What you should know of Dropbox',
          body: 'aka the Datastore API<br><img src="img/developer-datastores-vfliUo8_8.png" style="background-color: white">',
          position: '3000',
          disabled: false
        },
        {
          title: 'Step 1 - the idea',
          body: '',
          position: '4000',
          disabled: false
        },
        {
          title: 'Step 1 - the idea',
          body: 'What if we made a slide composer today?',
          position: '5000',
          disabled: false
        },
        {
          title: 'Step 2 - Hot damn! I didn\'t make the other slides!!',
          body: 'Well, let\'s <a href="index.html">work this out</a> together&hellip;',
          position: '6000',
          disabled: false
        }
      ];

      _.each(newRecords, function(element){
        slidesTable.insert(element);
      });

      $('#result').html('Ok, presentation reinitialized');

    });

  }
});
