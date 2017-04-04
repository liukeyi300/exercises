/**
 * Created by liukeyi on 2017/4/4.
 */
module.exports = function(options, callback) {
  const code = options.codes;
  const message = options.message;
  const timeouter = options.timeouter;
  const toggle = options.toggle;

  const wordArr = message.split(' ');
  let current = 0;
  const toggleArr = [current];

  for (let i = 0, length = wordArr.length; i < length; i ++) {
    const word = wordArr[i];
    const letterArr = word.split('');

    for (let j = 0, length2 = letterArr.length; j < length2; j ++) {

      if (typeof code[letterArr[j]] !== 'undefined') {

        const codeArr = code[letterArr[j]].split('');

        for (let k = 0, length3 = codeArr.length; k < length3; k ++) {
          if (codeArr[k] === '.') {
            current += 1;
            toggleArr.push(current);
          } else {
            current += 3;
            toggleArr.push(current);
          }

          if (k !== length3 - 1) {

            current += 1;
            toggleArr.push(current);
          }
        }
      }

      if (j !== length2 - 1) {
        current += 3;
        toggleArr.push(current);
      }
    }

    if (i !== length - 1) {
      current += 7;
      toggleArr.push(current);
    }
  }

  for (let i = 0, length = toggleArr.length; i < length; i ++) {
    if (i === length - 1) {
      timeouter(function() {
        toggle();
        callback();
      }, toggleArr[i]);
    } else {
      timeouter(toggle, toggleArr[i]);
    }
  }
};
