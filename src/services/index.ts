import axios from "axios";
import { IEtherPrice } from "./types";
/**
 * get ether price in btc and usd
 */
export const getCurrentEthePrice = async () => {
  const res = await axios.get(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHSCAN_API}`
  );
  return res.data.result as IEtherPrice;
};

/** get base gas price */
export const getGasBasePrice = async () => {
  const res = await axios.get(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_ETHSCAN_API}`
  );
  return res.data.result.suggestBaseFee as string;
};

export const getTransactionDataByHash = async (hash: string) => {
  const apiUrl = "https://api.etherscan.io/api";

  const params = {
    module: "proxy",
    action: "eth_getTransactionByHash",
    txhash: hash,
    apikey: process.env.NEXT_PUBLIC_ETHSCAN_API,
  };

  return axios.get(apiUrl, { params }).then((response) => {
    // Handle the response here
    return response.data.result;
  });
};

// const data = await getTransactionDataByHash("lol");
// console.log(data);
