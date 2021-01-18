/**
 *convert number into string
 * @ {Number} src
 * @ {Integer} base in the range of (2, 8, 10, 16)
 * return String
 **/
export function NumberToString(src, base) {
  if (typeof src !== 'number') {
    throw new Error('input source must be the type of number');
  }
  let sign = src >= 0 ? true : false;
  if (!sign) {
    src = Math.abs(src);
  }
  let result;
  switch (base) {
    case 2:
      result = '0b' + src.toString(2);
      break;
    case 8:
      result = '0o' + src.toString(8);
      break;
    case 10:
      result = src.toString(10);
      break;
    case 16:
      result = '0x' + src.toString(16);
      break;
    default:
      throw new Error('the base parameter only accepts 2, 8, 10, 16 as invalid input');
      break;
  }
  if (!sign) {
    result = '-' + result;
  }
  return result;
}
/**
 * convert binary, decimal octal, hex number string into decimal number
 * @ {String} src
 * return Number
 **/
export function StringToNumber(src) {
  if (typeof src !== 'string') {
    throw new Error('input source must be the type of string');
  }
  src = src.trim();
  src = src.toLowerCase();
  let sign = 1;
  if (src.startsWith('-')) {
    sign = -1;
    src = src.substring(1, src.length);
  }
  src = src.split('.');
  if (src.length > 2) {
    throw new Error("input format invalid, it can't be convert into a number");
  }
  let int = Number(src[0]) * sign;
  if (src[1]) {
    let result = 0;
    let base = 10;
    let frac = [];
    for (let i = 0; i < src[1].length; i++) {
      frac.push(src[1][i]);
    }
    if (src[0].startsWith('0b')) {
      base = 2;
    }
    if (src[0].startsWith('0o')) {
      base = 8;
    }
    if (src[0].startsWith('0x')) {
      base = 16;
      frac = frac.map(element => {
        return Number('0x' + element);
      });
    }
    for (let i = 0; i < frac.length; i++) {
      result += Math.pow(base, -i - 1) * frac[i];
    }
    return int + result * sign;
  }
  return int;
}
