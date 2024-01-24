import crypto from "crypto";

export function hashString(input: string) {
  return crypto.subtle
    .digest("SHA-1", new TextEncoder().encode(input))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
}
