import { ethers } from "ethers";

/**
 * @param {string | number} hexValue
 * @returns {bigint}
 */
export function hexToWei(hexValue: bigint | string | number) {
  if (!hexValue) {
    return "";
  }
  return ethers.toBigInt(hexValue);
}

/**
 * @param {string | number} weiValue
 * @returns {bigint}
 */
export function weiToEth(weiValue: bigint | string | number) {
  if (!weiValue) {
    return "";
  }
  return ethers.formatUnits(weiValue, "ether");
}
