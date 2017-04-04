/**
 * Created by liukeyi on 2017/4/4.
 */
module.exports = function(limit, promiseAll) {
  return new Promise(resolve => {
    const resultArr = [];
    let promiseNum = 0;
    let runIndex = 0;
    runAPromise(runIndex);

    function runAPromise(index) {
      if (index < promiseAll.length) {
        if (promiseNum < limit) {
          const promise = promiseAll[index];
          runIndex ++;
          promiseNum ++;
          promise().then(function(result) {
            resultArr[index] = result;
            promiseNum --;
            runAPromise(runIndex);
          });
          runAPromise(runIndex);
        }
      } else {
        if (promiseNum === 0) {
          resolve(resultArr);
        }
      }
    }
  });
};
