
import os, sys
root = os.path.abspath('.')
sys.path.append(root)
from utils import pair_sum, direct_neighbors, in_grid, to_grid, enum_grid, pair_diff
from pathlib import Path

with open(Path(__file__).parent.resolve() / "puzzle-2.test", 'r') as f:
    test_input = f.read()
test_cases = [[test_input, 1206]]

def flood_fill(x, y, grid):
    cell = grid[y][x]
    stack = [[x, y]]
    seen = set()
    while len(stack):
        x, y = stack.pop()
        if (x, y) in seen:
            continue
        seen.add((x, y))
        for nx, ny in (pair_sum(n, [x, y]) for n in direct_neighbors):
            if in_grid(ny, nx, grid) and grid[ny][nx] == cell:
                stack.append([nx, ny])
    return seen

def solve(input):
    grid = to_grid(input)
    plots = []
    seen = set()
    for gx, gy, cell in enum_grid(grid):
        if (gx, gy) in seen:
            continue
        plot = flood_fill(gx, gy, grid)
        all_sides = set()
        for x, y in plot:
            seen.add((x, y))
            for dir in direct_neighbors:
                nx, ny = pair_sum(dir, [x, y])
                if not in_grid(ny, nx, grid) or grid[ny][nx] != cell:
                    all_sides.add(((x, y), dir))

        seen_sides = set()
        nbSides = 0
        for side in all_sides:
            if side in seen_sides:
                continue
            pos, normal = side
            nbSides += 1
            dir1 = tuple(reversed(normal))
            dir2 = pair_diff([0, 0], dir1)
            current = pos
            while True:
                key = (current, normal)
                if key not in all_sides or key in seen_sides:
                    break
                seen_sides.add(key)
                current = pair_sum(dir1, current)

            current = pos
            while True:
                key = (current, normal)
                if current != pos and (key not in all_sides or key in seen_sides):
                    break
                seen_sides.add(key)
                current = pair_sum(dir2, current)
        
        plots.append({"area": len(plot), "nbSides": nbSides, "cell": cell})
    
    return sum(p["area"] * p["nbSides"] for p in plots)

solution = 966476

print(solve(test_cases[0][0]))

with open(Path(__file__).parent.resolve() / "input", 'r') as f:
    print(solve(f.read()))