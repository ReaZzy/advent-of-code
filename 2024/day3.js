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

const part1 = () => {
  let res = 0;

  const re = new RegExp(/mul\(\d+,\d+\)/g);
  const matches = input.match(re);
  for (const match of matches) {
    const nums = match.split(",");
    const num1 = Number(nums[0].slice(4));
    const num2 = Number(nums[1].slice(0, -1));

    res += num1 * num2;
  }

  return res;
};

const part2 = () => {
  const rules = [];
  const rulesRe = new RegExp(/(?:(do\(\))|(don't\(\)))/gi);
  let rulesMatches;
  while ((rulesMatches = rulesRe.exec(input)) !== null) {
    rules.push([rulesMatches.index, rulesMatches[0] === "do()"]);
  }

  let curAllowed = true;
  let res = 0;

  const re = new RegExp(/mul\(\d+,\d+\)/g);
  let match;
  while ((match = re.exec(input)) !== null) {
    while (rules.length && match.index > rules[0]?.[0]) {
      curAllowed = rules.shift()[1];
    }

    if (!curAllowed) {
      continue;
    }

    const nums = match[0].split(",");
    const num1 = Number(nums[0].slice(4));
    const num2 = Number(nums[1].slice(0, -1));

    res += num1 * num2;
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
