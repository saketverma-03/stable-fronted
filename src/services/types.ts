export type TransactionData = {
  hash: string;
  blockNumber: bigint;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  txreceipt_status: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  isError: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

export type Erc20TokenTransactions = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export interface IEtherPrice {
  ethbtc: string;
  ethusd: string;
}
