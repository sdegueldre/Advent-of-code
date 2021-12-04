/**
 * Creates groups of a given length inside an array.
 * Ex: ([1, 2, 3, 4], 2) => ([[1, 2], [2, 3], [3, 4]])
 *
 * @param {Array} arr the array from which to form groups
 * @param {number} len the length of the groups to form
 * @returns a new array containing groups of size len
 */
function group(arr, len) {
    return arr.slice(0, -len+1).map((_, i) => arr.slice(i, i + len));
}

function zip(...arr) {
    return arr.length ? arr[0].map((_, i) => arr.map(row => row[i])) : [];
}

function sum(arr) {
    return arr.reduce((acc, v) => acc + v);
}

function pairWise(func, arr1, arr2) {
    return zip(arr1, arr2).map(el => func(el));
}

function counter(arr) {
    return arr.reduce((O, x) => (O[x] = (O[x] || 0) + 1, O), {});
}

module.exports = {
    group,
    zip,
    sum,
    pairWise,
    counter,
}