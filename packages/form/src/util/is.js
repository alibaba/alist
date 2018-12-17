import { EDIT, PREVIEW, DISABLED, HIDDEN } from '../static/index';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const isPromise = p => (p && p.then && typeof p.then === 'function');
const isInvalidVal = val => (typeof val === 'number' ? false : !val);
const isSingleItemSet = arg => (arg.length >= 3 && typeof arg[1] === 'string');
const isFunction = func => typeof func === 'function';
const isValidStatus = status => [EDIT, PREVIEW, DISABLED, HIDDEN].indexOf(status) !== -1;

export {
    isObject,
    isInvalidVal,
    isSingleItemSet,
    isPromise,
    isFunction,
    isValidStatus,
};
