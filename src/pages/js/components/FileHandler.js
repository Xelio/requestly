(function($) {
  function getOrCreateDownloadLink() {
    var $link = $('#downloadLink');

    if ($link.length === 0) {
      $link = $('<a id="downloadLink">download</a>').appendTo('body');
    }

    $link.hide();
    return $link;
  }

  function saveAsTextFile(text, fileName) {
    var textFileAsBlob = new Blob([text], { type:'text/plain' }),
      $downloadLink = getOrCreateDownloadLink();

    $downloadLink.attr('download', fileName || 'file');

    if (window.webkitURL != null) {
      $downloadLink.attr('href', window.webkitURL.createObjectURL(textFileAsBlob));
    }

    $downloadLink.get(0).click();
  }

  function getOrCreateUploadLink() {
    var $link = $('#uploadLink');

    if ($link.length === 0) {
      $link = $('<input type="file" id="uploadLink" />').appendTo('body');
    }

    $link.hide();
    return $link;
  }

  function loadTextFile(callback) {
    var $link = getOrCreateUploadLink(),
      reader = new FileReader();

    reader.onload = function(evt) {
      callback(evt.target.result);
    };

    $link.change(function() {
      reader.readAsText($link.get(0).files[0], 'UTF-8');
      $link.val('');
    });

    $link.click();
  }

  Backbone.on('file:save', saveAsTextFile);
  Backbone.on('file:load', loadTextFile);

}(jQuery));