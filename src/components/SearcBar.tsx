"use client";
import { identifyEthereumString } from "@/util";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearcBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [formErr, setFormErr] = useState(false);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // identify searchterm is address or transactionId
    const type = identifyEthereumString(searchTerm);

    switch (type) {
      case "address":
        router.push(`address-details?address=${searchTerm}&tab=1`);

        break;
      case "hash":
        router.push(`transaction-details?hash=${searchTerm}`);
        break;
      default:
        break;
    }
  }

  function handleInputChange(value: string, action: Function) {
    if (formErr) setFormErr(false);
    action(value);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex my-2 justify-between p-2  border  rounded-xl bg-background"
      >
        <select name="pets" id="pet-select" className="ml-2 bg-transparent">
          <option value="">Options</option>
        </select>
        <input
          className="bg-transparent outline-none border border-transparent  focus:border active:border rounded-md  flex-1 px-2 mx-4 "
          type="text"
          onChange={(e) => handleInputChange(e.target.value, setSearchTerm)}
          value={searchTerm}
          placeholder="Search by address / transaction hash"
        />
        <button className="p-2 bg-blue-500 rounded-md ">
          <SearchIcon className="h-4 w-4" />
        </button>
      </form>
    </>
  );
}
