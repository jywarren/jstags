function shortCodePrompt(el, options) {

  options = options || {};

  options.regex = options.regex || /\[prompt:(\w*):*([\s\w]*):*(\w*)\]/g;

  // to be attached to on each matching form:
  options.submitForm = options.submitForm || function submitPromptForm(e, before, after) {

    options.submitUrl = options.submitUrl || '/';

    $.post(options.submitUrl, {
      before: before,
      after: after
    })
     .done(options.onComplete)
     .fail(options.onFail);

  }

  options.replacePrompt = options.replacePrompt || function replacePrompt(match, p1, p2, p3) {

    var o = '',
        placeholder = p2 || "",
        uniqueId = p3 || "short-code-form-" + parseInt(Math.random() * 10000),
        submit = "Add";
    o += '<form id="' + uniqueId + '" class="well">';
    if (p1 == 'text')      o += '<p><input class="form-control" type="text" placeholder="' + placeholder + '" /></p>';
    if (p1 == 'paragraph') o += '<p><textarea class="form-control" placeholder="' + placeholder + '" /></textarea></p>';
    o += '<p><button class="btn btn-default" type="submit">' + submit  + '</button> <span class="prompt-message"></span></p>\n</form>';

    function interceptForm(e) {
      e.preventDefault();
      var input = $('#' + uniqueId + ' .form-control').val();
      options.submitForm(e, match, input + '\n\n' + match);
      var message = $('#' + uniqueId + ' .prompt-message');
      message.html('<i class="fa fa-circle-o-notch fa-spin" style="color:#bbb;"></i>');
      return false;
    }

    // if passed as option, may need to bind to local scope?
    options.onComplete = options.onComplete || function onComplete(response) {
      var message = $('#' + uniqueId + ' .prompt-message');
      if (response === 'true' || response === true) {
        message.html('<i class="fa fa-check" style="color:green;"></i>');
        var input = $('#' + uniqueId + ' .form-control').val();
        var form = $('#' + uniqueId).prepend('<p>' + input + '</p>');
        var input = $('#' + uniqueId + ' .form-control').val();
        input.val('');
      } else {
        message.html('There was an error. Do you need to <a href="/login">log in</a>?');
      }
    }

    // if passed as option, may need to bind to local scope?
    options.onFail = options.onFail || function onFail(response) {
      var message = $('#' + uniqueId + ' .prompt-message');
      message.html('There was an error. Do you need to <a href="/login">log in</a>?');
    }

    setTimeout(function timeOut() {
      // using jQuery here: 
      $('#' + uniqueId).submit(interceptForm);
    }, 0);

    return o;

  }

  var output = el.innerHTML.replace(options.regex, options.replacePrompt);

  return output;

}
