const characters = {
  "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９", "0": "０",
  " ": "　", "`": "`", "-": "－", "=": "＝", "~": "~", "!": "！", "@": "＠", "#": "＃", $: "＄", "%": "％", "^": "^", "&": "＆", "*": "＊", "(": "（", ")": "）", _: "_", "+": "＋",
  q: "ｑ", w: "ｗ", e: "ｅ", r: "ｒ", t: "ｔ", y: "ｙ", u: "ｕ", i: "ｉ", o: "ｏ", p: "ｐ",
  "[": "[", "]": "]", "\\": "\\",
  Q: "Ｑ", W: "Ｗ", E: "Ｅ", R: "Ｒ", T: "Ｔ", Y: "Ｙ", U: "Ｕ", I: "Ｉ", O: "Ｏ", P: "Ｐ",
  "{": "{", "}": "}", "|": "|",
  a: "ａ", s: "ｓ", d: "ｄ", f: "ｆ",g: "ｇ", h: "ｈ", j: "ｊ", k: "ｋ", l: "ｌ",
  ";": "；", "'": "＇",
  A: "Ａ", S: "Ｓ", D: "Ｄ", F: "Ｆ", G: "Ｇ", H: "Ｈ", J: "Ｊ", K: "Ｋ", L: "Ｌ",
  ":": "：",'"': '"',
  z: "ｚ", x: "ｘ", c: "ｃ", v: "ｖ", b: "ｂ", n: "ｎ", m: "ｍ",
  ",": "，", ".": "．", "/": "／",
  Z: "Ｚ", X: "Ｘ", C: "Ｃ", V: "Ｖ", B: "Ｂ", N: "Ｎ", M: "Ｍ",
  "<": "<", ">": ">", "?": "？"
};

const input = $('#input-textarea');
const custom = $('#custom-textarea');

$(document).ready(function() {

  input.on('input', function(e) { // when someone starts typing inside input text-area
    custom.val('');
    let value = this.value.split('');
    
    setTimeout(function() {
      Object.keys(characters).map((char) => {
        for (var j = 0; j < value.length; j++) {
          let i = value.indexOf(char);

          if (i !== -1) {
            value[i] = characters[char];
            custom.val(value.join(''));
          }

          if (value.indexOf('\n') !== -1) {
            custom.val(value.join('').replace(/^\s+|\s+$/gm, ''));
          }
        }
      });
    });
  });
});