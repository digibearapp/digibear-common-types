import chalk from "chalk";
import * as paths from "./paths.js";
import { deleteDir } from "./clean-up.js";
import { downloadDbIconsRelease } from "./download-latest-release.js";
import { createTypesFile } from "./create-types-file.js";
// const chalk = require("chalk");
// const paths = require("./paths.js");
// const { deleteDir } = require("./clean-up.js");
// const { downloadDbIconsRelease } = require("./download-latest-release.js");
// const { createTypesFile } = require("./create-types-file.js");

console.log(`${chalk.inverse.white(" JS ")} generate-types-file.js started.`);
deleteDir(paths.TEMP_PATH);

downloadDbIconsRelease().then(
  (msg) => {
    console.log(msg);
    createTypesFile();
    deleteDir(paths.TEMP_PATH);
    console.log(
      `${chalk.inverse.green(" JS ")} generate-db-icons.js ended successfully.`
    );
  },
  (error) => {
    console.log(`${chalk.inverse.red(" JS ")} generate-db-icons.js failed.`);
    console.group();
    console.error(error);
    console.groupEnd();
  }
);
