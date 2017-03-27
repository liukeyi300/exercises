/**
 * Created by liukeyi on 2017/3/27.
 */
'use strict';

module.exports = function(preState, action) {
  const actionType = ['$push', '$unshift', '$splice', '$set', '$merge', '$apply'];

  function shallowCopy(object) {
    if (object instanceof Array) {
      return [].slice.call(object);
    } else {
      let result = {};
      Object.keys(object).forEach(key => {
        result.key = shallowCopy(object[key]);
      });

      return result;
    }

  }

  function update(state, action) {
    Object.keys(action).forEach(key => {
      console.log(key);
      switch(key) {
        case actionType[0]:  // push
          console.log(state);
          [].concat.apply(state, action[key]);
          break;
        case actionType[1]:  // unshift
          [].concat.apply(action[key], state);
          break;
        case actionType[2]:  // splice
          [].splice.apply(state, action[key]);
          break;
        case actionType[3]:  // set
          state = action[key];
          break;
        case actionType[4]:  // merge
          Object.assign(state, action[key]);
          break;
        case actionType[5]:  // apply
          state = action[key].apply(null, state);
          break;
        default:
          if (typeof state[key] !== 'undefined') {
            state[key] = update(state[key], action[key]);
          } else {
            state = Object.assign(state, action);
          }
          break;
      }

    });

    return state;
  }

  return update(shallowCopy(preState), action);
};
