"use client";
import { getAllTransactionsByAddress } from "@/services/address";
import { TransactionData } from "@/services/types";
import { hexToWei, weiToEth } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  address: string;
};
// TODO address should come from parent
export default function TransactionsTable(props: Props) {
  const [pageNumber, setPageNuber] = useState(1);
  const [rawData, setRawData] = useState<TransactionData[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!props.address) {
      router.push("/page-not-found");
    }
  }, [props.address]);

  const filterdData = useMemo(() => cleanData(rawData), [rawData]);

  const { refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["transactions_table", pageNumber],
    queryFn: async () => {
      let res = await getAllTransactionsByAddress(
        props.address,
        20,
        pageNumber
      );
      setRawData(res);
      return rawData;
    },
  });

  function changePageNumber(newPageNumber: number) {
    if (newPageNumber === pageNumber || newPageNumber < 1) {
      return;
    }
    // change page number
    setPageNuber(newPageNumber);

    // update table with new data
    refetch();
  }

  return (
    <>
      <div className="w-full rounded-xl   overflow-x-auto grid  max-w-7xl border shadow-[rgba(0,_0,_0,_0.4)_0px_0px_40px] shadow-sdo">
        {/* headers */}
        <div className="flex justify-end gap-2 pr-4 py-2">
          {isLoading && <Loader2 className=" animate-spin  mr-auto ml-4" />}
          {isRefetching && <Loader2 className=" animate-spin  mr-auto ml-4" />}
          <button
            className="px-2 flex gap-1 items-center py-1 bg-primary w-fit rounded-md text-sm"
            onClick={() => changePageNumber(pageNumber - 1)}
          >
            <ArrowLeft className="h-5 w-5" /> Previous
          </button>
          <button
            className="px-2 flex gap-1 items-center py-1 bg-primary w-fit rounded-md text-sm "
            onClick={() => changePageNumber(pageNumber + 1)}
          >
            Next <ArrowRight className="h-5 w-5 " />
          </button>
        </div>
        <table className="text-sm">
          <thead className="whitespace-nowrap border-y">
            <tr>
              <th className="text-left p-2 pl-6 text-sm">Transaction Hash</th>
              <th className="text-left p-2 text-sm">Block</th>
              <th className="text-left p-2 text-sm">Time Stamp</th>
              <th className="text-left p-2 text-sm">From</th>
              <th className="text-left p-2 text-sm">To</th>
              <th className="text-left p-2 text-sm">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {filterdData?.map((tData) => (
              <TableRow {...tData} key={tData.timestamp} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

type TableRowProps = {
  thash: string;
  block: bigint | string;
  timestamp: string;
  from: string;
  to: string;
  value: string;
};

function TableRow(props: TableRowProps) {
  return (
    <>
      <tr className="border-b">
        <td className="p-2 pl-6 text-primary">
          {props.thash.substring(0, 10)}...
        </td>
        <td className="p-2 text-primary">
          {props.block.toString().substring(0, 10)}...
        </td>
        <td className="p-2">{props.timestamp}</td>
        <td className="p-2 text-primary">{props.from.substring(0, 10)}..</td>
        <td className="p-2 text-primary">{props.to.substring(0, 10)}...</td>
        <td className="p-2">{props.value.substring(0, 9)} ETH</td>
      </tr>
    </>
  );
}

function cleanData(data: TransactionData[]) {
  return data.map((item) => {
    return {
      thash: item.hash,
      block: hexToWei(item.blockNumber),
      timestamp: item.timeStamp,
      from: item.from,
      to: item.to,
      value: weiToEth(hexToWei(item.value)),
    };
  });
}
