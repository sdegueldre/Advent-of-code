// I stole the following code from reddit from two different solutions
// because I couldn't get anything to work after going at it for a very long time.
// Most of the solutions I tried didn't work on my input for part 1. The first 
// solution I found that works on my part 1 had a part 2 that didn't work on my
// input so I found *another* solution whose part 2 worked on my input.
// I'll go over this hopefully after the holidays and understand wtf is going on
// with these. It's obvious I need more practice on this category of problem.
// Day 16 also kicked my butt even though I ended up finally getting it to work
// after 12 hours of total active time. I couldn't get this part 1 after 8 hours
// and decided to call it quits.

const parse = input => {
    return input.split("\n").map(line => {
        let split = line.split(" ");
        let robotCosts = [];
        // Ore robot
        let type = split[3];
        let resource = split[7].slice(0, -1);
        let amount = parseInt(split[6]);
        let cost = [{ resource, amount }];
        robotCosts.push({ type, cost });
        // Clay robot
        type = split[9];
        resource = split[13].slice(0, -1);
        amount = parseInt(split[12]);
        cost = [{ resource, amount }];
        robotCosts.push({ type, cost });
        // Obsidian robot
        type = split[15];
        let resource1 = split[19];
        let amount1 = parseInt(split[18]);
        let resource2 = split[22].slice(0, -1);
        let amount2 = parseInt(split[21]);
        cost = [
            { resource: resource1, amount: amount1 },
            { resource: resource2, amount: amount2 },
        ];
        robotCosts.push({ type, cost });
        // Geode robot
        type = split[24];
        resource1 = split[28];
        amount1 = parseInt(split[27]);
        resource2 = split[31].slice(0, -1);
        amount2 = parseInt(split[30]);
        cost = [
            { resource: resource1, amount: amount1 },
            { resource: resource2, amount: amount2 },
        ];
        robotCosts.push({ type, cost });

        return robotCosts;
    });
}

export const part1 = input => {
    input = parse(input);
    console.time("ExecutionTime");

    const canAfford = (cost, ore, clay, obsidian) => {
        let oreCost = cost.find((c) => c.resource === "ore");
        let clayCost = cost.find((c) => c.resource === "clay");
        let obsidianCost = cost.find((c) => c.resource === "obsidian");

        return (
            (oreCost === undefined || oreCost.amount <= ore) &&
            (clayCost === undefined || clayCost.amount <= clay) &&
            (obsidianCost === undefined || obsidianCost.amount <= obsidian)
        );
    };

    const craftRobot = (
        robotCost,
        oreProduction,
        clayProduction,
        obsidianProduction,
        newTimeLeft
    ) => {
        let { ore, orePerSecond } = oreProduction;
        let { clay, clayPerSecond } = clayProduction;
        let { obsidian, obsidianPerSecond } = obsidianProduction;

        while (!canAfford(robotCost, ore, clay, obsidian) && newTimeLeft > 0) {
            ore += orePerSecond;
            clay += clayPerSecond;
            obsidian += obsidianPerSecond;
            newTimeLeft--;
        }
        ore += orePerSecond;
        clay += clayPerSecond;
        obsidian += obsidianPerSecond;
        newTimeLeft--;
        for (let cost of robotCost) {
            if (cost.resource === "ore") ore -= cost.amount;

            if (cost.resource === "clay") clay -= cost.amount;
            if (cost.resource === "obsidian") obsidian -= cost.amount;
        }

        return { ore, clay, obsidian, newTimeLeft };
    };

    const nextOptimalRobot = (
        oreProduction,
        clayProduction,
        obsidianProduction,
        geodeProduction,
        timeLeft,
        blueprint
    ) => {
        let geodeProduced = 0;
        for (let robot of blueprint) {
            if (robot.type === "ore" && timeLeft < 16) continue;
            if (robot.type === "clay" && timeLeft < 6) continue;
            if (robot.type === "obsidian" && timeLeft < 3) continue;
            if (robot.type === "geode" && timeLeft < 2) continue;
            let { ore, clay, obsidian, newTimeLeft } = craftRobot(
                robot.cost,
                oreProduction,
                clayProduction,
                obsidianProduction,
                timeLeft
            );
            if (newTimeLeft <= 0) {
                continue;
            }

            let newOreProduction = { ...oreProduction };
            let newClayProduction = { ...clayProduction };
            let newObsidianProduction = { ...obsidianProduction };
            let newGeodeProduction = { ...geodeProduction };
            if (robot.type === "ore") newOreProduction.orePerSecond++;
            if (robot.type === "clay") newClayProduction.clayPerSecond++;
            if (robot.type === "obsidian") newObsidianProduction.obsidianPerSecond++;
            if (robot.type === "geode") newGeodeProduction.geodePerSecond++;
            newOreProduction.ore = ore;
            newClayProduction.clay = clay;
            newObsidianProduction.obsidian = obsidian;
            let score = robot.type === "geode" ? newTimeLeft : 0;

            score += nextOptimalRobot(
                newOreProduction,
                newClayProduction,
                newObsidianProduction,
                newGeodeProduction,
                newTimeLeft,
                blueprint
            );

            if (score > geodeProduced) {
                geodeProduced = score;
            }
        }
        return geodeProduced;
    };
    let qualitySum = 0;
    let i = 1;
    for (let blueprint of input) {
        let score = nextOptimalRobot(
            { ore: 0, orePerSecond: 1 },
            { clay: 0, clayPerSecond: 0 },
            { obsidian: 0, obsidianPerSecond: 0 },
            { geode: 0, geodePerSecond: 0 },
            24,
            blueprint
        );
        qualitySum += score * i++;
    }
    console.timeEnd("ExecutionTime");

    return qualitySum;
}

export const part2 = input => {
    const types = {
        ORE: 0,
        CLAY: 1,
        OBSIDIAN: 2,
        GEODE: 3
    }
    
    const getBlueprints = input => input.split("\n").map(line => {
        let tmp = line.match(/\d+/g).map(Number);
        return [[{
            type: types.ORE,
            amount: tmp[1]
        }], [{
            type: types.ORE,
            amount: tmp[2]
        }], [{
            type: types.ORE,
            amount: tmp[3]
        }, {
            type: types.CLAY,
            amount: tmp[4]
        }], [{
            type: types.ORE,
            amount: tmp[5]
        }, {
            type: types.OBSIDIAN,
            amount: tmp[6]
        }]]
    })
    
    const run = (bp, timeLeft) => {
        const getBotCost = (botType, costType) => bp[botType].filter(c => c.type == costType)[0].amount
        const canBuildBot = (type, resourcePool) => bp[type].every(c => resourcePool[c.type] > 0)
        const buildBot = (type, resourcePool) => {
            let rp = resourcePool.slice();
            bp[type].forEach(c => rp[c.type] -= c.amount)
            return rp;
        }
    
        const advancePool = (resourcePool, bots, mult = 1) => {
            let rp = resourcePool.slice();
            bots.forEach((bots, type) => rp[type] += bots*mult);
            return rp;
        }
    
        const addBot = (type, bots) => {
            bots[type]++;
            return bots;
        }
    
        const spitPathIfPossible = (path, botType, minRemainingT) => {
            if (!canBuildBot(botType, path.bots)) return 0;
            let t = Math.max(0, ...bp[botType].map(c => Math.ceil((c.amount-path.resourcePool[c.type])/path.bots[c.type])))
            if (path.timeLeft - t >= minRemainingT) return paths.push({
                timeLeft: path.timeLeft-t-1,
                bots: addBot(botType, path.bots.slice()),
                resourcePool: buildBot(botType, advancePool(path.resourcePool, path.bots, t+1))
            })
            return 0;
        }
    
        let paths = [{bots: [1, 0, 0, 0], timeLeft: timeLeft, resourcePool: [0, 0, 0, 0]}];
        let maxResult = 0, earliestGeode = 0;
    
        while (paths.length) {
            let path = paths.pop();
    
            if (path.resourcePool[types.GEODE] > 0 && path.timeLeft > earliestGeode) earliestGeode = path.timeLeft;
            if (path.timeLeft < earliestGeode && path.resourcePool[types.GEODE] == 0) continue;
    
            if (path.timeLeft <= 0) {
                maxResult = Math.max(maxResult, path.resourcePool[types.GEODE]);
                continue;
            }
    
            let spitPaths = 0;
    
            spitPaths += spitPathIfPossible(path, types.GEODE, 1);
            spitPaths += spitPathIfPossible(path, types.OBSIDIAN, 4);
    
            if (path.bots[types.CLAY] < getBotCost(types.OBSIDIAN, types.CLAY)-1)
                spitPaths += spitPathIfPossible(path, types.CLAY, 7);
           
            if (path.bots[types.ORE] < 4)
                spitPaths += spitPathIfPossible(path, types.ORE, 16);
    
            if (!spitPaths) paths.push({
                timeLeft: 0,
                bots: path.bots.slice(),
                resourcePool: advancePool(path.resourcePool, path.bots, path.timeLeft)
            })
        }
    
        return maxResult;
    }
    
    
    let blueprints = getBlueprints(input);
    return blueprints.slice(0, 3).reduce((res, bp, bpId) => res * run(bp, 32), 1);
}