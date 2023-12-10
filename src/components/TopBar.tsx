import { getCurrentEthePrice, getGasBasePrice } from "@/services";
import { Fuel, Palette } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), {
  loading: () => (
    <button className="p-2 border rounded-sm">
      <Palette className="h-5 w-5" />
    </button>
  ),
  ssr: false,
});

export default async function TopBar() {
  const gasPrice = await getGasBasePrice();
  const ethData = await getCurrentEthePrice();

  return (
    <>
      <div className="flex gap-2 sticky top-0 bg-background text-xs w-full p-2 border-b items-center">
        <div>
          Ethe Price: <span className="text-primary"> $ {ethData.ethusd}</span>
        </div>
        <div className="flex gap-1 text-primary">
          <Fuel className="h-4 text-foreground" />{" "}
          <span className="text-foreground">GasPrice:</span> {gasPrice}
          <span> </span>wei
        </div>

        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
