import chalk from "chalk";
import * as paths from "./paths.mjs";
import { deleteDir } from "./clean-up.mjs";
import { downloadDbIconsRelease } from "./download-latest-release.mjs";
import { createTypesFile } from "./create-types-file.mjs";

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
