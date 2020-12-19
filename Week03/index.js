import Tokenizer from "./tokenizer.js";
import LogThis from "./logger.js";
import Exp from "./parser.js";
const log = document.querySelector("#log");
const buttonCreate = document.querySelector("#create");
buttonCreate.addEventListener("click", createAST);

function createAST() {
  const expression = document.querySelector("#expression");
  log.innerHTML = "";
  let expressionValue = expression.value.toString();
  let tokens = [];
  try {
    for (let token of Tokenizer(expressionValue)) {
      if (token.type !== "Whitespace" && token.type !== "LineTerminator") {
        tokens.push(token);
      }
    }
    LogThis(Exp(tokens));
  } catch (Exception) {
    LogThis(Exception);
  }
}
