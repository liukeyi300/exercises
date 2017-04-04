/**
 * Created by liukeyi on 2017/4/4.
 */
module.exports = function(limit, promiseArray) {
  const ctx = this;
  const args = [];

  for (let i = 0; i < limit; i ++) {
    promiseArray[i].call(this, null).then(function() {

    });
  }

  let thenFunc = function() {};

  function then(func) {
    thenFunc = func;
  }

  function singleResolve(result) {

  }

  return {
    then: then
  };
};
