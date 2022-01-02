export function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

export function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function toCamelCase(text) {
  return lowerFirstLetter(toPascalCase(text));
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function lowerFirstLetter(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

// module.exports = { toPascalCase, toCamelCase, capitalizeFirstLetter };
