
function replaceFormTag(match, p1, p2, p3) {

  var o = '',
      contents = p3 || p2;
      uniqueId = p3 ? p2 : false;
  uniqueId = uniqueId || "short-code-form-" + parseInt(Math.random() * 10000);
  o += '<form id="' + uniqueId + '" class="well">';

  var innerTag = contents.replace(/\[(\w+):*([\s\w]+)*\]/, function replaceInnerTag(m, pp1, pp2) {

    var placeholder = pp2 || "";
    var input = '';
    input += '<p><input class="form-control" type="text" placeholder="' + placeholder + '" /></p>';
    return input;

  });

  o += innerTag;
  var submit = p1 || "Add";
  o += '<p><button class="btn btn-default" type="submit">' + submit  + '</button></p>\n</form>';

  return o;

}


function shortCodeForm(el) {
  var regex = /\[form:*(\w+)*:*(\w+)*\](\s*\[[^\/].*\]\s*)*\[\/form\]/g;
  var output = el.innerHTML.replace(regex, replaceFormTag)
  return output;
}



function shortCodePrompt(el, options) {

  options = options || {};

  options.regex = options.regex || /\[prompt:(\w*):*([\s\w]*):*(\w*)\]/g;

  // to be attached to on each matching form:
  options.submitForm = options.submitForm || function submitPromptForm(e, before, after) {

    options.nid = options.nid || 0;

    $.post('/wiki/replace/' + options.nid, {
      before: before,
      after: after
    })
     .done(function(response) {
      console.log(response);
    });

  }

  options.replacePrompt = options.replacePrompt || function replacePrompt(match, p1, p2, p3) {

    var o = '',
        placeholder = p2 || "",
        uniqueId = p3 || "short-code-form-" + parseInt(Math.random() * 10000),
        submit = "Add";
    o += '<form id="' + uniqueId + '" class="well">';
    o += '<p><input class="form-control" type="text" placeholder="' + placeholder + '" /></p>';
    o += '<p><button class="btn btn-default" type="submit">' + submit  + '</button></p>\n</form>';

    function interceptForm(e) {
      e.preventDefault();
      options.submitForm(e, match, $('#' + uniqueId + 'input').val() + '\n\n' + match);
      return false;
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

