export default class KMP {
  /**
   * @param {string} P input pattern string to build its BFA
   */
  constructor(pattern) {
    this.m = pattern.length;
    this.dfa = this.kmp(pattern);
  }

  /**
   * @param {String} pattern
   * @return {Object}
   * using KMP algorithm build the determininstic finite-state automaton
   * for the input pattern
   */
  kmp(pattern) {
    let dfa = [];
    let m = pattern.length;
    let x = 0;
    pattern = pattern.toUpperCase();
    for (let c = 0; c < 26; c++) {
      let char = String.fromCharCode("A".charCodeAt(0) + c);
      if (!dfa.includes(char)) {
        dfa[char] = new Array(m).fill(0);
      }
    }
    //init the first column of dfa
    dfa[pattern.charAt(0)][0] = 1;
    //build the dfa depends on the initiated dfa and x
    for (let j = 1; j < m; j++) {
      for (let key in dfa) {
        dfa[key][j] = dfa[key][x];
        dfa[pattern.charAt(j)][j] = j + 1;
      }
      x = dfa[pattern.charAt(j)][x];
    }
    return dfa;
  }

  /**
   *
   * @param {String} text
   * @return {Array}
   */
  search(text) {
    text = text.toUpperCase();
    let n = text.length;
    let m = this.m;
    let result = [];
    for (let i = 0, j = 0; i < n; i++) {
      j = this.dfa[text.charAt(i)][j];
      if (j == m) {
        result.push(i - m + 1 + " to " + i);
        j = 0;
      }
    }
    if (result.length !== 0) {
      return result;
    } else {
      return "Not Match";
    }
  }
}
