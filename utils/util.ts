import crypto from "crypto";

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

export function formatArea(input: number | null) {
  if (!input) {
    return "-";
  }
  return (input.toFixed(1) + "&nbsp;m²").replace(".", ",");
}

export function formatPrice(input: number | null, rounded = false) {
  if (!input) {
    return "-";
  }
  const val = rounded ? Math.round(input) : input.toFixed(2);
  return (val + "&nbsp;€").replace(".", ",");
}

export function hashString(input: string) {
  return crypto.subtle
    .digest("SHA-1", new TextEncoder().encode(input))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
}
