export function cleanNumberString(input?: string) {
  if (!input) {
    return "";
  }

  // Remove any characters that are not digits, comma, or dot
  let cleanedString = input.replace(/[^0-9,.]/g, "");
  if (cleanedString.includes(",") && cleanedString.includes(".")) {
    cleanedString = cleanedString.replace(".", "");
  }
  cleanedString = cleanedString.replace(",", ".");
  return cleanedString;
}

export function parseUncleanInt(input: string) {
  if (!input) {
    return null;
  }
  return parseInt(cleanNumberString(input));
}

export function parseUncleanFloat(input: string) {
  if (!input) {
    return null;
  }
  return parseFloat(cleanNumberString(input));
}
