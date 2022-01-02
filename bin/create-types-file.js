// const chalk = require("chalk");
import chalk from "chalk";
import fs from "fs";
import path from "path";
import * as constants from "./constants.js";
import * as paths from "./paths.js";
import { toCamelCase } from "./utils.js";
// const fs = require("fs");
// const path = require("path");
// const constants = require("./constants");
// const paths = require("./paths.js");
// const { toCamelCase } = require("./utils.js");

export function createTypesFile() {
  const folders = fs
    .readdirSync(paths.ASSETS_PATH, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const folder = folders[0];
  console.log(folder);
  console.log(`Extracting icons from Digibear.`);
  if (!fs.lstatSync(path.join(paths.ASSETS_PATH, folder)).isDirectory()) return;
  extractNamesFromSVGFiles(folder);
  console.log(`${chalk.inverse.green(" DONE ")} Created type IconName.`);
}

function extractNamesFromSVGFiles(folder) {
  const icons = [];
  const svgFiles = fs.readdirSync(path.join(paths.ASSETS_PATH, folder));
  svgFiles.forEach((svgFile) => {
    let svgFullFileName = svgFile.split(".svg")[0].split("-");
    let iconName = svgFullFileName
      .slice(0, svgFullFileName.length - 1)
      .join("-");
    iconName = toCamelCase(iconName);
    icons.push(iconName);
    console.log(
      `${chalk.inverse.green(" DONE ")} Added ${iconName} to type IconName.`
    );
  });
  const namesAsType = mapNamesToTypes(icons);
  const fileLines = generateFileLines(namesAsType);
  createFile(fileLines);
}

function mapNamesToTypes(icons) {
  const formatted = icons
    .map((icon, index) => {
      if (index != icons.length - 1) {
        return `"${icon}",\n\t`;
      }
      return `"${icon}"`;
    })
    .join("");
  return `\
export const DbIconNameKeys = [${formatted}] as const;
export type DbIconName = typeof DbIconNameKeys[number];
export function isDbIconName(value: string): value is DbIconName {
    return DbIconNameKeys.indexOf(value as any) !== -1;
}
    `;
}

function generateFileLines(namesAsType) {
  return `\
${constants.HEADER}
export type Size = string | number;

export interface DbSvgDefinition {
    xmlns: string,
    viewBox: string,
    width: Size,
    height: Size,
    fill: string,
    groupTransform: string,
    paths: Array<DbPathDefinition>,
}

export interface DbPathDefinition {
    d: string,
    fill: string,
    opacity: number
}

export const DbIconStyleKeys = ["line", "fill", "duotone"] as const;
export type DbIconStyle = typeof DbIconStyleKeys[number];
export function isDbIconStyle(value: string): value is DbIconStyle {
	return DbIconStyleKeys.indexOf(value as any) !== -1;
}

export interface DbIconContextProps {
	iconStyle?: DbIconStyle;
	size?: Size;
	color?: string;
	opacity?: number;
	secondaryColor?: string;
	secondaryOpacity?: number;
    flippedH?: boolean;
	flippedV?: boolean;
}

export interface DbIconProps {
    iconName: DbIconName;
	iconStyle?: DbIconStyle;
	size?: Size;
	color?: string;
	opacity?: number;
	secondaryColor?: string;
	secondaryOpacity?: number;
    flippedH?: boolean;
	flippedV?: boolean;
}

export type DbSvgPathData = {
	[key in DbIconStyle]: string[];
}

export type DbIconPack = {
	[key in DbIconName]: DbIconDefinition;
}

export interface DbIconDefinition {
	iconName: DbIconName,
	svgPathData: DbSvgPathData,
}

${namesAsType}
`;
}

function createFile(fileLines) {
  try {
    fs.writeFileSync(paths.TYPES_PATH, fileLines);
    console.log(
      `${chalk.inverse.green(" DONE ")} index.d.ts (types file) created.`
    );
  } catch (err) {
    console.error(
      `${chalk.inverse.red(" FAIL ")} Failed to create index.d.ts file.`
    );
    console.group();
    console.error(err);
    console.groupEnd();
    return;
  }
}

// module.exports = { createTypesFile };
