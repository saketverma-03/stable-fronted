/**
 * Identify if a string is an Ethereum address or a transaction hash.
 * @param {string} str - The string to be identified.
 * @returns {string} - Returns 'address' if it's an Ethereum address, 'hash' if it's a transaction hash, or 'unknown' if neither.
 */

export function identifyEthereumString(
  str: string
): "address" | "hash" | "unknown" {
  // Check if it's an address
  if (/^(0x)?[0-9a-fA-F]{40}$/.test(str)) {
    return "address";
  }

  // Check if it's a transaction hash
  if (/^(0x)?[0-9a-fA-F]{64}$/.test(str)) {
    return "hash";
  }

  // Neither an address nor a transaction hash
  return "unknown";
}

export * from "./unit-converter";
