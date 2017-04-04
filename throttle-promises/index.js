module.exports = throttlePromises;

function throttlePromises(limit, promiseFactories) {

  return new Promise(function(resolve) {
    var resolved = [];
    var openSlots = limit;
    var nextIndex = 0;
    next(nextIndex);

    function next(index) {
      if (index < promiseFactories.length) {
        if (openSlots > 0) {
          nextIndex++;
          openSlots--;
          var promise = promiseFactories[index]();
          promise.then(function(result) {
            resolved[index] = result;
            openSlots++;
            next(nextIndex)
          });
          next(nextIndex);
        }
      } else {
        if (openSlots === limit) {
          resolve(resolved);
        }
      }
    }
  });





}
