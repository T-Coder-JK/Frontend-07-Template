let term = Symbol("term");
let counter = Symbol("conter");
export default class Trie {
  constructor() {
    this.root = Object.create(null);
    this.max = null;
    this.mostWord = null;
  }
  /**
   *@param {string} word insert the word into the instance of Trie
   */
  insert(word) {
    let node = this.root;
    let dth = 0;
    for (let char of word) {
      ++dth;
      if (!node[char]) {
        node[char] = Object.create(null);
      }
      node = node[char];
      if (dth == word.length && !node[term]) {
        node[term] = true;
        node[counter] = 0;
      }
      if (dth == word.length && node[term]) {
        node[counter]++;
      }
    }
  }
  /**
   * @returns {Object} get the most frequently occurring word in the instance of trie
   */
  most() {
    this.max = 0;
    let scan = (node, chars) => {
      if (node[term] && node[counter] > this.max) {
        this.max = node[counter];
        this.mostWord = chars;
      }
      for (let key in node) {
        let added = chars + key;
        scan(node[key], added);
      }
    };
    scan(this.root, "");
    return { max: this.max, mostOccurringWord: this.mostWord };
  }
}
