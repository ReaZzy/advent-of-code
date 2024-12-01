import { promises } from "node:fs";
import path from "node:path";
import { exit } from "node:process";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

let input;
try {
  const file = await promises.readFile(path.join("input.txt"));
  input = file.toString();
} catch (e) {
  console.error("Cannot read input", e);
  exit(1);
}

input = input.split("\n");
input.pop();

const part1 = () => {
  const heapLeft = new MinPriorityQueue();
  const heapRight = new MinPriorityQueue();
  for (const entry of input) {
    const nums = entry.split(" ");

    heapLeft.enqueue(nums[0]);
    heapRight.enqueue(nums.at(-1));
  }

  let res = 0;

  while (heapLeft.size() || heapRight.size()) {
    const left = heapLeft.dequeue();
    const right = heapRight.dequeue();

    res += Math.abs(left - right);
  }

  return res;
};

const part2 = () => {
  const leftMap = new Map();
  const rightMap = new Map();

  for (const entry of input) {
    const nums = entry.split(" ");

    leftMap.set(nums[0], (leftMap.get(nums[0]) ?? 0) + 1);
    rightMap.set(nums.at(-1), (rightMap.get(nums.at(-1)) ?? 0) + 1);
  }

  let res = 0;
  for (const [key, val] of leftMap.entries()) {
    res += Number(key) * val * (rightMap.get(key) ?? 0);
  }

  return res;
};

try {
  const res = String(part2());
  await promises.writeFile(path.join("output.txt"), res);
  console.log(res);
} catch (e) {
  console.error("Cannot write output", e);
  exit(1);
}
