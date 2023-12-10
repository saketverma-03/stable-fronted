"use client";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";

export function NavBar() {
  const { isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <nav className="w-full p-1 flex gap-4 items-center px-2 border-b">
      <Link href="/">EtherScan</Link>
      <w3m-button size="sm" />
      <div
        className={`ml-auto pr-2 items-center transition-colors ${
          isDisconnected ? "hidden" : "flex"
        }`}
      >
        <Link className="hover:text-primary" href="/user-dashboard">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
