const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

function solution(input) {
    const nums = input.split('\n');
    const result = nums.reduce((acc, v) => serialize(reduce(parse(`[${acc},${v}]`))));
    return magnitude(parse(result));
}

function parse(input) {
    const tokens = input.split('').reverse();

    function parseExpr() {
        if (peek() === '[') {
            return parsePair();
        }
        return parseNum();
    }

    function parseNum() {
        const digits = [];
        while (peek().match(/\d/)) {
            digits.push(tokens.pop());
        }
        const val = parseInt(digits.join(''));
        return { val, maxChild: val };
    }

    function parsePair() {
        pop('[');
        const left = parseExpr();
        pop(',');
        const right = parseExpr();
        pop(']');
        const node = {
            left,
            right,
        };
        left.parent = node;
        right.parent = node;
        recompute(node);
        return node;
    }

    function pop(char) {
        const val = tokens.pop();
        if (val !== char) {
            console.error(tokens.reverse().join(''));
            throw new Error(`expected '${char}', got '${val}'`);
        }
    }

    function peek() {
        return tokens[tokens.length - 1];
    }

    return parseExpr();
}

function reduce(expr) {
    if (expr.depth >= 5) {
        return reduce(explode(expr));
    } else if (expr.maxChild >= 10) {
        return reduce(split(expr));
    }
    return expr;
}

function split(expr) {
    let node = expr;
    while (!('val' in node) && node.maxChild >= 10) {
        node = node.left.maxChild >= 10 ? node.left : node.right;
    }
    const half = node.val / 2;
    const str = `[${Math.floor(half)},${Math.ceil(half)}]`;
    const replacement = parse(str);
    replacement.parent = node.parent;
    if (node.parent.left === node) {
        node.parent.left = replacement;
    } else {
        node.parent.right = replacement;
    }
    recompute(node.parent);
    return expr;
}

function explode(expr) {
    let node = expr;
    while (node.depth !== 5) {
        if (node.left >= 5) {
            node = node.left;
        } else {
            node = node.right;
        }
    }
    for (let i = 4; i > 0; i--) {
        node = node.left.depth === i ? node.left : node.right;
    }
    const { left, right } = node;
    for (const other of walkLeft(node.left, false)) {
        other.val += left.val;
        recompute(other);
        break;
    }
    for (const other of walkRight(node.right, false)) {
        other.val += right.val;
        recompute(other);
        break;
    }
    const { parent } = node;
    const replacement = { val: 0, parent, maxChild: 0 };
    if (parent.right === node) {
        parent.right = replacement;
    } else {
        parent.left = replacement;
    }
    recompute(parent);
    return expr;
}

function recompute(base) {
    for (const node of ancestors(base)) {
        node.depth = 'val' in node ? 0 : Math.max(node.left.depth || 0, node.right.depth || 0) + 1;
        node.maxChild = 'val' in node ? node.val : Math.max(node.left.maxChild, node.right.maxChild);
    }
}

// Inorder/reverse order traversal
function* walkDirection(node, dir, includeSelf = true) {
    const otherDir = dir === 'right' ? 'left' : 'right';
    if (!node) {
        return;
    }
    yield* walkDirection(node[otherDir], dir);
    if (includeSelf && 'val' in node) {
        yield node;
    }
    if ('val' in node) {
        while (node.parent && node.parent[dir] === node) {
            node = node.parent;
        }
        if (!node.parent) {
            return;
        }
        yield* walkDirection(node.parent[dir], dir);
    }
}

function walkLeft(node, includeSelf = true) {
    return walkDirection(node, 'left', includeSelf);
}

function walkRight(node, includeSelf = true) {
    return walkDirection(node, 'right', includeSelf);
}

function* walk(tree) {
    if (!tree) {
        return;
    }
    yield* walk(tree.left);
    if ('val' in tree) {
        yield tree.val;
    }
    yield* walk(tree.right);
}

function serialize(tree) {
    return 'val' in tree ? tree.val : `[${serialize(tree.left)},${serialize(tree.right)}]`;
}

function* ancestors(node) {
    do yield node
    while (node = node.parent);
}

function magnitude(node) {
    return 'val' in node ? node.val : 3 * magnitude(node.left) + 2 * magnitude(node.right);
}

const [testInput, expected] = test.split('\n\n');
const s = solution(testInput)
console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);

console.log(solution(input));
