(function($) {
  var $notificationDiv = $('<div></div>').attr({id: 'rq-notifier'})
    .prependTo('body')
    .click(function() { $(this).hide(); });

  var timeoutId = null;

  function showNotification(options) {
    options = options || {};

    var message = options.message || '',
      className = options.className || '',
      timeout = options.timeout || 3000;

    if (!message) return;

    $notificationDiv.text(message)
      .removeClass('rq-info rq-notice rq-error rq-success')
      .addClass(className)
      .fadeIn(1000);

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    setTimeout(hideNotification, timeout);
  }

  function hideNotification() {
    $notificationDiv.fadeOut(1000);
  }

  Backbone.on('notification', showNotification);
}(jQuery));