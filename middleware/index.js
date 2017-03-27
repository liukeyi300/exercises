/**
 * Created by liukeyi on 2017/3/20.
 */
const Middleware = function() {
  const middles = [];

  function useImpl(middle) {
    middles.push(function(next) {
      return function() {
        middle(next);
      }
    });
  }

  function goImpl(func) {
    if (middles.length == 0) {
      return func.call(this);
    }

    const compose = middles.reduceRight(function(compose, func) {
      return func(compose);
    }, func);
    return compose();
  }

  return {
    use: useImpl,
    go: goImpl
  }
};

module.exports = Middleware;
