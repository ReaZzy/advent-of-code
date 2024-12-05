import { promises } from "node:fs";
import path from "node:path";
import { exit } from "node:process";

let input;
try {
  const file = await promises.readFile(
    path.join(import.meta.dirname, "./input.txt"),
  );
  input = file.toString();
} catch (e) {
  console.error("Cannot read input", e);
  exit(1);
}

input = input.split("\n");
input.pop();

const solvePart1 = (rule) => {
  const set = new Set(rule);
  const map = new Map();
  const depCount = new Map();
  let isDeps = true;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
      break;
    }

    if (isDeps) {
      const nums = input[i].split("|");
      if (set.has(nums[0]) && set.has(nums[1])) {
        const arr = map.get(nums[0]) ?? [];
        arr.push(nums[1]);
        map.set(nums[0], arr);
        depCount.set(nums[1], (depCount.get(nums[1]) ?? 0) + 1);
      }
    }
  }

  const queue = rule.filter((r) => !depCount.has(r));
  const res = [];
  while (queue.length) {
    const node = queue.pop();
    res.push(node);
    if (!map.has(node)) {
      continue;
    }
    for (const nei of map.get(node)) {
      if (depCount.get(nei) === 1) {
        depCount.delete(nei);
        queue.push(nei);
      }
      depCount.set(nei, (depCount.get(nei) ?? 0) - 1);
    }
  }
  const isValid = rule.join("") === res.join("");
  if (isValid) {
    return rule[Math.floor(rule.length / 2)];
  }
};
const solvePart2 = (rule) => {
  const set = new Set(rule);
  const map = new Map();
  const depCount = new Map();
  let isDeps = true;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
      break;
    }

    if (isDeps) {
      const nums = input[i].split("|");
      if (set.has(nums[0]) && set.has(nums[1])) {
        const arr = map.get(nums[0]) ?? [];
        arr.push(nums[1]);
        map.set(nums[0], arr);
        depCount.set(nums[1], (depCount.get(nums[1]) ?? 0) + 1);
      }
    }
  }

  const queue = rule.filter((r) => !depCount.has(r));
  const res = [];
  while (queue.length) {
    const node = queue.pop();
    res.push(node);
    if (!map.has(node)) {
      continue;
    }
    for (const nei of map.get(node)) {
      if (depCount.get(nei) === 1) {
        depCount.delete(nei);
        queue.push(nei);
      }
      depCount.set(nei, (depCount.get(nei) ?? 0) - 1);
    }
  }
  const isValid = rule.join("") === res.join("");
  if (!isValid) {
    return res[Math.floor(rule.length / 2)];
  }
};

const part1 = () => {
  let res = 0;
  let isDeps = true;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
      isDeps = false;
    }

    if (isDeps) {
      continue;
    } else {
      res += Number(solvePart1(input[i].split(",")) ?? 0);
    }
  }

  return res;
};

const part2 = () => {
  let res = 0;
  let isDeps = true;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
      isDeps = false;
    }

    if (isDeps) {
      continue;
    } else {
      res += Number(solvePart2(input[i].split(",")) ?? 0);
    }
  }

  return res;
};

try {
  const res = String(part2());
  await promises.writeFile(path.join(import.meta.dirname, "output.txt"), res);
  console.log(res);
} catch (e) {
  console.error("Cannot write output", e);
  exit(1);
}
