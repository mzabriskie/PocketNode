// Evaluate a block of code, and return the result
module.exports = function evaluate(code) {
  var wrap = false;
  var result;

  // Need to wrap object literals, otherwise they are expressed as a block
  // See http://stackoverflow.com/questions/17382024/why-is-a-bare-array-valid-javascript-syntax-but-not-a-bare-object
  if (code.indexOf('{') === 0 &&
      code.indexOf('}') === code.length - 1) {
    wrap = true;
  }

  // Evaluate code that was entered
  try {
    result = eval.call(null, (wrap ? '(' : '') + code + (wrap ? ')' : ''));
  } catch (x) {
    result = x;
  }

  return result;
}
