const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const isPromise = p => (p && p.then && typeof p.then === 'function');
const isInvalidVal = val => (typeof val === 'number' ? false : !val);
const isSingleItemSet = arg => (arg.length >= 3 && typeof arg[1] === 'string');

export default {
    isObject,
    isInvalidVal,
    isSingleItemSet,
    isPromise,
};
