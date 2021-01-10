/**
 * Encode the String's characters to UTF8 with binary format
 * @param {string} input
 * @returns {string}
 */
function UTF8_Encoding(input) {
  if (!input || typeof input !== 'string') {
    return new Error('Input error');
  }
  console.log(input.length);
  let buffer = [];
  for (let i = 0; i < input.length; i++) {
    let unicodeBin = input.codePointAt(i).toString(2);
    if (unicodeBin.length < 8) {
      buffer.push(unicodeBin.padStart(8, '0'));
    } else {
      let multi = Math.ceil((unicodeBin.length - 1) / 5);
      let dst = multi * 5 + 1;
      unicodeBin = unicodeBin.padStart(dst, '0');
      let temp = '0';
      temp = temp.padStart(multi + 1, '1');
      temp = temp + unicodeBin.slice(0, 7 - multi);
      buffer.push(temp);
      temp = unicodeBin.slice(7 - multi);
      for (let j = 1; j < multi; j++) {
        buffer.push('10' + temp.slice((j - 1) * 6, j * 6));
      }
    }
  }
  return buffer.toString().replaceAll(',', '');
}

// console.log(UTF8_Encoding('中文编码测试，english,  ()378jsijeåß≈≈∂¡™£'));
// TODO: Why some special characters in the unicode will be calculate length two in a string in js
// console.log(UTF8_Encoding('🚅'));
const output = document.querySelector('.binary');
output.textContent = UTF8_Encoding('🜖');
// UFT8_Encoding('a');

class Dog {
  constructor() {
    this.attacted = [];
  }
  attact(target) {
    this.attacted.push(target);
  }
}

class Human {
  constructor(hurt = false) {
    this.hurt = hurt;
    this.attacter = [];
  }
  beHurt(hurtBy) {
    this.hurt = true;
    this.attacter.push(hurtBy);
  }
}
