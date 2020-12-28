import Trie from "./trie.js";
import KMP from "./kmp.js";
import logThis from "./logger.js";
import WildCard from "./wildCard.js";

// Code from tire implementation
let tire = new Trie();
function randomWord(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
  }
  return result;
}

for (let i = 0; i < 10000; i++) {
  tire.insert(randomWord(4));
}

console.log(tire.most());

//Code for KNP implementation
const pattern = document.querySelector("#pattern");
const text = document.querySelector("#text-match");
const button = document.querySelector("#create");

button.addEventListener("click", () => {
  let kmp = new KMP(pattern.value);
  logThis(kmp.search(text.value));
});

//WildCard implementation
console.log(WildCard("abcabcabxaac", "a*b*bx*c"));
