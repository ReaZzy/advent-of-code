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
    const report = input[i].split(" ").map(Number);
    let isIncreasing = report[1] > report[0];
    let isValid = true;
    for (let j = 1; j < report.length; j++) {
      const diff = report[j] - report[j - 1];
      if (isIncreasing) {
        if (diff > 3 || diff < 1) {
          isValid = false;
          break;
        }
      } else {
        if (diff < -3 || diff > -1) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      res++;
    }
  }

  return res;
};

const part2 = () => {
  let safeReportCount = 0;

  function isValidSequence(seq, isIncreasing) {
    for (let j = 1; j < seq.length; j++) {
      const diff = seq[j] - seq[j - 1];
      if (isIncreasing) {
        if (diff > 3 || diff < 1) return false;
      } else {
        if (diff < -3 || diff > -1) return false;
      }
    }
    return true;
  }

  for (let i = 0; i < input.length; i++) {
    const report = input[i].split(" ").map(Number);

    if (isValidSequence(report, true) || isValidSequence(report, false)) {
      safeReportCount++;
      continue;
    }

    for (let j = 0; j < report.length; j++) {
      const modifiedReport = [...report.slice(0, j), ...report.slice(j + 1)];
      if (
        isValidSequence(modifiedReport, true) ||
        isValidSequence(modifiedReport, false)
      ) {
        safeReportCount++;
        break;
      }
    }
  }

  return safeReportCount;
};

try {
  const res = String(part2());
  await promises.writeFile(path.join(import.meta.dirname, "output.txt"), res);
  console.log(res);
} catch (e) {
  console.error("Cannot write output", e);
  exit(1);
}
