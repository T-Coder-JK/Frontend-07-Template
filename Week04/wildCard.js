export default function wildCard(source, pattern) {
  // find out how many * in the pattern
  let counter = 0;
  for (let n = 0; n < pattern.length; n++) {
    if (pattern[n] === "*") counter++;
  }
  // there is no * in the pattern
  if (counter === 0) {
    for (let n = 0; n < pattern.length; n++) {
      if (pattern[n] !== source[n] && pattern[n] !== "?") {
        return false;
      }
    }
    return true;
  }
  //restart again
  let i = 0;
  let lastIndex = 0;
  for (i; pattern[i] !== "*"; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== "?") {
      return false;
    }
  }

  lastIndex = i;

  for (let j = 0; j < counter - 1; j++) {
    i++;
    let subPattern = "";
    while (pattern[i] !== "*") {
      subPattern += pattern[i];
      i++;
    }

    let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
    reg.lastIndex = lastIndex;

    if (!reg.exec(source)) return false;

    lastIndex = reg.lastIndex;
  }

  for (
    let j = 0;
    j <= source.length - lastIndex && pattern[pattern.length - j] !== "*";
    j++
  ) {
    if (
      pattern[pattern.length - j] !== source[source.length - j] &&
      pattern[pattern.length - j] !== "?"
    ) {
      return false;
    }
  }

  return true;
}
