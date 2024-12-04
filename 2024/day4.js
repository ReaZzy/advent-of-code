import { warn } from "node:console";
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

const part1 = () => {
  let res = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] !== "X") {
        continue;
      }
      const diffs = [
        [
          [0, 0, 0],
          [1, 2, 3],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
        ],
        [
          [1, 2, 3],
          [0, 0, 0],
        ],
        [
          [1, 2, 3],
          [-1, -2, -3],
        ],
        [
          [0, 0, 0],
          [-1, -2, -3],
        ],
        [
          [-1, -2, -3],
          [-1, -2, -3],
        ],
        [
          [-1, -2, -3],
          [0, 0, 0],
        ],
        [
          [-1, -2, -3],
          [1, 2, 3],
        ],
      ];

      for (const diff of diffs) {
        if (
          input[i + diff[0][0]]?.[j + diff[1][0]] === "M" &&
          input[i + diff[0][1]]?.[j + diff[1][1]] === "A" &&
          input[i + diff[0][2]]?.[j + diff[1][2]] === "S"
        ) {
          res++;
        }
      }
    }
  }

  return res;
};

const part2 = () => {
  let res = 0;
  for (let i = 1; i < input.length; i++) {
    for (let j = 1; j < input[i].length; j++) {
      if (input[i][j] !== "A") {
        continue;
      }

      const diffs = [
        [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ],
        [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ],
        [
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
        ],
        [
          [1, -1],
          [1, 1],
          [-1, -1],
          [-1, 1],
        ],
      ];
      for (const diff of diffs) {
        if (
          input[i + diff[0][0]]?.[j + diff[0][1]] === "M" &&
          input[i + diff[1][0]]?.[j + diff[1][1]] === "M" &&
          input[i + diff[2][0]]?.[j + diff[2][1]] === "S" &&
          input[i + diff[3][0]]?.[j + diff[3][1]] === "S"
        ) {
          res++;
        }
      }
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
