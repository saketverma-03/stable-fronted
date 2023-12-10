import axios from "axios";
import { ethers } from "ethers";
import { Erc20TokenTransactions, TransactionData } from "./types";
import { pages } from "next/dist/build/templates/app-page";

/** get base gas price
 * @param {string} address
 * @return {string} 'balance amount in eather'
 */
export const getEtherBalnceByAddress = async (address: string) => {
  const res = await axios.get(
    "https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=YourApiKeyToken"
  );
  let wei = res.data.result as string;
  return ethers.formatEther(wei);
};

/** get all transactions by address
 * @param {string} address address to get all transactions
 * @param {number} offset  number of transactions
 * @param {number} page page number for transactions data
 */
export const getAllTransactionsByAddress = async (
  address: string,
  offset: number = 20,
  page: number = 1
) => {
  if (page < 1) {
    page = 1;
  }
  const res = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: "account",
      action: "txlist",
      page: page,
      offset: offset,
      sort: "desc",
      startblock: 0,
      endblock: 99999999,
      address: address,
      apiKey: process.env.NEXT_PUBLIC_ETHSCAN_API,
    },
  });

  return res.data.result as Array<TransactionData>;
};

/** get all Erc20TokenTransactions by address
 * @param {string} address address to get all transactions
 * @param {number} offset  number of transactions
 * @param {number} page page number for transactions data
 */
export const getAllErc20TokenByAddress = async (
  address: string,
  offset: number = 20,
  page: number = 1
) => {
  if (page < 1) {
    page = 1;
  }
  const apiUrl = "https://api.etherscan.io/api";

  const params = {
    module: "account",
    action: "tokentx",
    // contractaddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    address: address,
    page: page,
    offset: offset,
    startblock: 0,
    endblock: 27025780,
    sort: "asc",
    apikey: process.env.NEXT_PUBLIC_ETHSCAN_API,
  };
  const res = await axios.get(apiUrl, { params });
  return res.data.result as Array<Erc20TokenTransactions>;
};

// const data = await getAllErc20TokenByAddress(
//   "0x787B8840100d9BaAdD7463f4a73b5BA73B00C6cA"
// );
// console.log(data);
