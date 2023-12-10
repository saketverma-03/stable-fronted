"use client";
import Erc20TokenTransactionsTable from "@/components/adress-profile-page/ERC20Table";
import TransactionsTable from "@/components/adress-profile-page/TransactionsTable";
import { Copy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBalance } from "wagmi";

export default function Page() {
  const params = useSearchParams();
  const address = params.get("address");
  const router = useRouter();
  const { data, isLoading } = useBalance({
    address: address as `0x${string}`,
  });

  const [bal, setBal] = useState<typeof data>();

  useEffect(() => {
    if (!address) {
      router.push("/page-not-founted");
    }
    setBal(data);
  }, [address]);

  return (
    <>
      <main className="flex flex-col justify-center items-center  w-full h-full">
        <div className="w-full p-4 flex flex-col justify-center max-w-7xl">
          <h1 className="inline-flex gap-4 items-center ">
            <span className="text-2xl">Address</span>
            <span>{params?.get("address") || ""}</span>
            <Copy
              onClick={() =>
                navigator.clipboard.writeText(params?.get("address") || "")
              }
              className="h-8 w-8 rounded-md active:opacity-100 opacity-70 hover:bg-secondary p-2"
            />
          </h1>
          <div className="border rounded-lg p-4 my-8">
            <h2 className="opacity-70 text-sm">ETH Balance</h2>
            <span>{bal?.formatted} ETH</span>
          </div>
          <Tabs />
          <Tables />
        </div>
      </main>
    </>
  );
}

function Tabs() {
  const params = useSearchParams();

  const tabNumber = Number(params.get("tab"));
  const newParamas = new URLSearchParams(params.toString());
  const router = useRouter();

  function foo(newTabNumber: number) {
    newParamas.delete("tab");
    newParamas.set("tab", newTabNumber.toString());
    router.push(window.location.pathname + "?" + newParamas);
  }
  return (
    <div className="w-full mb-4 flex gap-4">
      <button
        onClick={() => foo(1)}
        className={` px-2 border border-primary flex gap-1 items-center py-1 w-fit rounded-md text-sm ${
          tabNumber == 1 || !tabNumber ? " bg-primary" : " bg-secondary"
        }  `}
      >
        Transactions
      </button>

      <button
        onClick={() => foo(2)}
        className={` px-2 border border-primary flex gap-1 items-center py-1 w-fit rounded-md text-sm ${
          tabNumber == 2 ? " bg-primary" : " bg-secondary"
        }  `}
      >
        ERC20Tockns
      </button>
    </div>
  );
}

function Tables() {
  const params = useSearchParams();
  const tabNumber = Number(params.get("tab"));
  if (tabNumber == 1 || !tabNumber) {
    return <TransactionsTable address={params.get("address") || ""} />;
  } else {
    return (
      <Erc20TokenTransactionsTable address={params.get("address") || ""} />
    );
  }
}
