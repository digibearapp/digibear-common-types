// const fs = require("fs");
import fs from "fs";
// const chalk = require("chalk");
import chalk from "chalk";

export function deleteDir(dir) {
  console.log(`Removing ${dir}`);
  fs.rmdirSync(dir, { recursive: true });
  console.log(chalk.green(`Removed ${dir}`));
}

// module.exports = { deleteDir };
