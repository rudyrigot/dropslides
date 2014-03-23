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
      _.each(slidesTable.query({disabled: false}), function(slide){
        $('.slides').insertinorder(
          _.template($('#slide-template').html(), { slide: slide }), // the slide
          slide.get("position")
        );
      });

      /* If changes are performed, this page reloads */
      datastore.recordsChanged.addListener(function (event) {
        if (event.affectedRecordsForTable('slides').length > 0) {
          location.reload();
        }
      });

      /* Now that the DOM is up-to-date, launching the Reveal.js presentation */
      Reveal.initialize({
        touch: true,
        hideAddressBar: true
      });

      /* Making sure we come back on the same slide */
      if (location.hash == '#r' && localStorage['currentSlide']) {
        Reveal.slide(localStorage['currentSlide']);
      }
      Reveal.addEventListener( 'slidechanged', function( event ) {
        localStorage['currentSlide'] = event.indexh;
        console.log(localStorage['currentSlide']);
      } );
    });

  }
});
