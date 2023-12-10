import { SearchBar } from "@/components";

export default function Page() {
  return (
    <main className="flex  bg-background flex-col w-full min-h-screen h-full ">
      <div>
        {/* Search Bar */}
        <div className="grid px-4 py-24 md:grid-cols-2">
          <div>
            <h1 className="text-2xl">The Ethereum Blockchain Explorer</h1>
            <SearchBar />
            <span>search here</span>
          </div>
        </div>
      </div>
    </main>
  );
}
