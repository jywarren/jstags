function jstags(el) {
  var regex = /\[form:*(\w*)\](\s*\[[^\/].*\]\s*)*\[\/form\]/g;
  var output = el.innerHTML.replace(regex, function replaceFormTag(match, p1, p2) {

    var o = '';
    o += '<form id="UNIQUE">';

    var innerTag = p2.replace(/\[(\w+):*(\w+)*\]/, function replaceInnerTag(m, pp1, pp2) {

      var placeholder = pp2 || "";
      var input = '';
      input += '<p><input class="form-control" type="text" placeholder="' + placeholder + '" /></p>';
      return input;

    });

    o += innerTag;
    var submit = p1 || "Add";
    o += '<p><button class="btn btn-default" type="submit">' + submit  + '</button></p>\n</form>';

    return o;

  })
  return output;
}

function jsprompt(el) {
  var regex = /\[prompt:(\w*):*(\w*)\]/g;
  var output = el.innerHTML.replace(regex, function replacePrompt(match, p1, p2) {

    var o = '',
        placeholder = p2 || "",
        submit = p1 || "Add";
    o += '<form id="UNIQUE">';
    o += '<p><input class="form-control" type="text" placeholder="' + placeholder + '" /></p>';
    o += '<p><button class="btn btn-default" type="submit">' + submit  + '</button></p>\n</form>';

    return o;

  });

  return output;
}
