direct_neighbors = (
    (0, 1),
    (0, -1),
    (1, 0),
    (-1, 0),
)

def pair_sum(arr1, arr2):
    return tuple(a + b for a, b in zip(arr1, arr2))

def pair_diff(arr1, arr2):
    return tuple(a - b for a, b in zip(arr1, arr2))

def in_grid(row, col, grid):
    return 0 <= row < len(grid) and 0 <= col < len(grid[0])

def to_grid(str):
    return [[*r] for r in str.split("\n")]

def enum_grid(grid):
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            yield x, y, cell