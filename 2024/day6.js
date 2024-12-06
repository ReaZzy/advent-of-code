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
const grid = [];
let guard;
let direction;

for (let row = 0; row < input.length; row++) {
  const tempRow = new Array(input[row].length).fill();
  for (let col = 0; col < input[row].length; col++) {
    tempRow[col] = input[row][col];
    if (["v", "<", ">", "^"].includes(input[row][col])) {
      guard = [row, col];

      if (input[row][col] === "v") {
        direction = 0;
      }
      if (input[row][col] === "<") {
        direction = 1;
      }
      if (input[row][col] === "^") {
        direction = 2;
      }
      if (input[row][col] === ">") {
        direction = 3;
      }
    }
  }

  grid.push(tempRow);
}

const part1 = () => {
  let localGuard = structuredClone(guard);
  let localDirection = direction;
  const dir = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];
  let res = 0;
  let set = new Set();

  while (grid[localGuard[0]]?.[localGuard[1]]) {
    const newStep =
      grid[localGuard[0] + dir[direction][0]]?.[
        localGuard[1] + dir[direction][1]
      ];
    if (newStep === "#") {
      localDirection = (localDirection + 1) % 4;
      continue;
    }

    localGuard = [
      localGuard[0] + dir[localDirection][0],
      localGuard[1] + dir[localDirection][1],
    ];
    const key = `${localGuard[0]}:${localGuard[1]}`;
    if (!set.has(key)) {
      res++;
      set.add(key);
    }
  }

  return set;
};

let resp = 0;

const part2 = (grid) => {
  let localGuard = structuredClone(guard);
  let localDirection = direction;
  const dir = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];
  let set = new Set();

  while (grid[localGuard[0]]?.[localGuard[1]]) {
    const key = `${localGuard[0]}:${localGuard[1]}:${localDirection}`;
    if (set.has(key)) {
      resp++;
      break;
    }
    set.add(key);
    const newStep =
      grid[localGuard[0] + dir[direction][0]]?.[
        localGuard[1] + dir[direction][1]
      ];
    if (newStep === "#") {
      localDirection = (localDirection + 1) % 4;
      continue;
    }

    localGuard = [
      localGuard[0] + dir[localDirection][0],
      localGuard[1] + dir[localDirection][1],
    ];
  }
};

const set = part1();
console.log(set);
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    const localGrid = structuredClone(grid);
    localGrid[row][col] = "#";
    part2(localGrid);
  }
}

try {
  const res = String(resp);
  await promises.writeFile(path.join(import.meta.dirname, "output.txt"), res);
  console.log(res);
} catch (e) {
  console.error("Cannot write output", e);
  exit(1);
}
