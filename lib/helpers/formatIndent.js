module.exports = function formatIndent(indent) {
  var str = '';

  while (indent-- > -1) {
    str += '  ';
  }

  return str;
}
