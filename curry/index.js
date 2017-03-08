/**
 * Created by liukeyi on 2017/3/8.
 */
module.exports = function(func) {
    if (typeof func !== 'function') {
        throw 'Wrong input!';
    }

    function innerCurry(func, args) {
        if (args.length === func.length) {
            return func.apply(null, args);
        }

        return function() {
            const thisArgs = Array.prototype.slice.call(arguments);
            return innerCurry(func, Array.prototype.slice.call(args).concat(thisArgs));
        }
    }

    return innerCurry(func, []);
};
