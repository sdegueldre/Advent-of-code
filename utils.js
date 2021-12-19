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
    const length = Math.max(...arr.map(a => a.length));
    return arr.length ? Array(length).fill().map((_, i) => arr.map(row => row[i])) : [];
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

function* range(a, b) {
    const diff = Math.sign(b - a);
    if (!diff) {
        yield a;
        return;
    }
    yield a;
    while (a != b) yield (a += diff);
}

function repeatToLength(arr, length) {
    return Array(length).fill().map((_, i) => arr[i%arr.length]);
}

function* cartProduct(a, b) {
    b = [...b];
    for(const elA of a) {
        for (const elB of b) {
            yield [elA, elB];
        }
    }
}

function* enumerate(arr) {
    for (let i = 0; i < arr.length; i++) yield [i, arr[i]];
}

module.exports = {
    group,
    zip,
    sum,
    pairWise,
    counter,
    range,
    repeatToLength,
    cartProduct,
    enumerate,
}