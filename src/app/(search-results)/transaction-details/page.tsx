import { getTransactionDataByHash } from "@/services";
import { ethers } from "ethers";
import { HelpCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page(props: any) {
  const searchParams = props.searchParams;
  if (!searchParams.hash) {
    redirect("/page-not-found");
  }

  const res = await getTransactionDataByHash(searchParams.hash as string);
  function hexaToEath(val: string) {
    if (!val) return "";
    const weiValue = ethers.toBigInt(val);
    const etherValue = ethers.formatUnits(weiValue, "ether");
    return etherValue;
  }

  return (
    <main className="flex bg-background flex-col w-full min-h-screen h-full ">
      <div className="flex justify-center">
        <div className="m-4 max-w-7xl shadow-[rgba(0,_0,_0,_0.4)_0px_0px_40px] shadow-sdo rounded-lg p-4 border w-full flex flex-col">
          <DataItem title={"Transaction Hash"} item={res.hash} />
          <DataItem title={"From"} item={res.from} />
          <DataItem title={"To"} item={res.to} />
          <DataItem title={"Value"} item={`${hexaToEath(res.value)} ETH`} />
          <DataItem
            title={"Gas Price"}
            item={`${hexaToEath(res.gasPrice)} ETH`}
          />
          <DataItem
            title={"Transaction Id"}
            item={ethers.toBigInt(res.blockNumber).toString()}
          />
          <DataItem
            title={"Type"}
            item={ethers.toBigInt(res.type).toString()}
          />
        </div>
      </div>
    </main>
  );
}

const DataItem = (props: { title: string; item: string | number }) => {
  return (
    <>
      <div className="grid mb-6 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <h2 className="flex text-sm mb-2 md:mb-0 items-center font-semibold opacity-50">
          <HelpCircle className="h-3" />
          {props.title} :
        </h2>
        <div className="pl-1 text-sm">{props.item}</div>
      </div>
    </>
  );
};
