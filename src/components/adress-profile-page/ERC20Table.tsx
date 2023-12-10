"use client";
import { getAllErc20TokenByAddress } from "@/services/address";
import { Erc20TokenTransactions } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  address: string;
};
// TODO address should come from parent
export default function Erc20TokenTransactionsTable({ address }: Props) {
  const [pageNumber, setPageNuber] = useState(1);
  const router = useRouter();

  // hadnnle if no address or empty string
  useEffect(() => {
    if (!address) {
      router.push("/page-not-found");
    }
  }, [address]);

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["transactions_table", pageNumber],
    queryFn: async () => {
      return await getAllErc20TokenByAddress(address, 20, pageNumber);
    },
  });

  // Pagination
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
              <th className="text-left p-2 text-sm">From</th>
              <th className="text-left p-2 text-sm">To</th>
              <th className="text-left p-2 text-sm">Value</th>
              <th className="text-left p-2 text-sm">Token</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.map((tData) => (
              <TableRow {...tData} key={tData.timeStamp} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function TableRow(props: Erc20TokenTransactions) {
  return (
    <>
      <tr className="border-b">
        <td className="p-2 pl-6 text-primary">
          {props.hash.substring(0, 10)}...
        </td>

        <td className="p-2 text-primary">{props.from.substring(0, 10)}..</td>
        <td className="p-2 text-primary">{props.to.substring(0, 10)}...</td>
        <td className="p-2">{props.value.substring(0, 10)} ETH</td>
        <td className="p-2">
          {props.tokenName}
          <span className="opacity-60">{`(${props.tokenSymbol})`}</span>
        </td>
      </tr>
    </>
  );
}
