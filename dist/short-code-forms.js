
function replaceFormTag(match, p1, p2, p3) {

  var o = '',
      contents = p3 || p2;
      uniqueId = p3 ? p2 : undefined;
  o += '<form';
  if (uniqueId) o += ' id="' + uniqueId + '"';
  o += ' class="well">';

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


function replacePrompt(match, p1, p2, p3) {

  var o = '',
      placeholder = p2 || "",
      uniqueId = p3 || "",
      submit = p1 || "Add";
  o += '<form id="' + uniqueId + '" class="well">';
  o += '<p><input class="form-control" type="text" placeholder="' + placeholder + '" /></p>';
  o += '<p><button class="btn btn-default" type="submit">' + submit  + '</button></p>\n</form>';

  return o;

}


function shortCodePrompt(el) {
  var regex = /\[prompt:(\w*):*([\s\w]*):*(\w*)\]/g;
  var output = el.innerHTML.replace(regex, replacePrompt);
  return output;
}

