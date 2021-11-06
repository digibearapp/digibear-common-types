const fs = require("fs");
const chalk = require("chalk");

function deleteDir(dir) {
    console.log(`Removing ${dir}`);
    fs.rmdirSync(dir, { recursive: true });
    console.log(chalk.green(`Removed ${dir}`));
}

module.exports = { deleteDir };