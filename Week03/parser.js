/**
 * Get tokens input from tokenizer,
 * depending on arithmetic production rules,
 * producing AST from bottom to up via LL algorithm
 * @param {Array[object]} tokens
 * @returns {Object} expression
 */
export default function Exp(tokens) {
  if (tokens[0].type === "AddExp" && tokens[1] && tokens[1].type === "EOF") {
    let node = {
      type: "Exp",
      children: [tokens.shift(), tokens.shift()],
    };
    tokens.unshift(node);
    return node;
  }
  AddExp(tokens);
  return Exp(tokens);
}

function AddExp(tokens) {
  if (tokens[0].type === "MultiExp") {
    let node = {
      type: "AddExp",
      children: [tokens[0]],
    };
    tokens[0] = node;
    return AddExp(tokens);
  }
  if (
    tokens[0].type === "AddExp" &&
    tokens[1] &&
    (tokens[1].type === "+" || tokens[1].type === "-")
  ) {
    let node = {
      type: "AddExp",
      children: [],
    };
    tokens[1].type === "+" ? (node.operator = "+") : (node.operator = "-");
    node.children.push(tokens.shift());
    node.children.push(tokens.shift());
    MultiExp(tokens);
    node.children.push(tokens.shift());
    tokens.unshift(node);
    return AddExp(tokens);
  }
  if (tokens[0].type === "AddExp") {
    return tokens[0];
  }
  MultiExp(tokens);
  return AddExp(tokens);
}

function MultiExp(tokens) {
  if (tokens[0].type === "Number") {
    let node = {
      type: "MultiExp",
      children: [tokens[0]],
    };
    tokens[0] = node;
    return MultiExp(tokens);
  }
  if (
    tokens[0].type === "MultiExp" &&
    tokens[1] &&
    (tokens[1].type === "*" || tokens[1].type === "/")
  ) {
    let node = {
      type: "MultiExp",
      children: [],
    };
    tokens[1].type === "*" ? (node.operator = "*") : (node.operator = "/");
    for (let i = 0; i < 3; i++) {
      node.children.push(tokens.shift());
    }
    tokens.unshift(node);
    return MultiExp(tokens);
  }
  if (tokens[0].type === "MultiExp") {
    return tokens[0];
  }
  throw "Parser: expression cannot be matched";
}
