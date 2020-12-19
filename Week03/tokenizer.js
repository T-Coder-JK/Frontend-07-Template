// using ()|() structure matches the variable dictionary's index one by one
var regexp = /([0-9\.]+)|([\s]+)|([ \r\n]+)|(\*)|(\/)|(\+)|(\-)/g;
// var regexp = /([\t]+)/g;
var dictionary = ["Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"];

/**
 * Tokenise string, doing lexical analysis
 * Param: String
 * Return: iterator
 * */
export default function* tokenizer(source) {
  let result = null;
  while (true) {
    let lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (!result) break;
    if (regexp.lastIndex - lastIndex > result[0].length) {
      regexp.lastIndex = 0;
      throw "there are characters cannot be matched";
    }
    let token = {
      type: null,
      value: null,
    };
    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        token["type"] = dictionary[i - 1];
        token.value = result[0];
      }
    }
    yield token;
  }
  yield {
    type: "EOF",
  };
}
