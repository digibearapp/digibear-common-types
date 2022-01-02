import fs from "fs";
import chalk from "chalk";

export function deleteDir(dir) {
  console.log(`Removing ${dir}`);
  fs.rmdirSync(dir, { recursive: true });
  console.log(chalk.green(`Removed ${dir}`));
}
