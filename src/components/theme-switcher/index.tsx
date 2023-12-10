"use client";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

function CurrentThemeIcon({ theme }: { theme: string }) {
  if (theme === "dark") {
    return <Moon className="h-5 w-5" />;
  }
  if (theme === "light") {
    return <Sun className="h-5 w-5" />;
  }
  if (theme === "dim") {
    return <SunMoon className="h-5 w-5" />;
  }
  return <Sun className="h-5 w-5" />;
}

export default function ThemeSwitcher() {
  const [isOpen, setOpen] = useState(false);
  const { setTheme, theme, systemTheme } = useTheme();

  function changeTheme(theme: string) {
    setOpen(!isOpen);
    setTheme(theme);
  }

  return (
    <>
      <div className="relative text-foreground text-md">
        <button
          onClick={() => setOpen((val) => !val)}
          className="p-2 hover:bg-background-100 bg-background border rounded-lg"
        >
          <CurrentThemeIcon theme={theme || ""} />
        </button>
        <ul
          className={`rounded-sm origin-top mt-4 absolute right-0   z-50 bg-background border transition-transform ${
            isOpen ? "scale-100" : "scale-0"
          }`}
        >
          <li>
            <button
              onClick={() => changeTheme("light")}
              className="flex items-center gap-1 p-2 hover:bg-primary hover:text-muted  m-1 rounded-sm"
            >
              <Sun className="h-5 w-5" /> light
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTheme("dark")}
              className="flex items-center gap-1 p-2 hover:bg-primary hover:text-muted m-1 rounded-sm"
            >
              <Moon className="h-5 w-5" /> Dark
            </button>
          </li>{" "}
          <li>
            <button
              onClick={() => changeTheme("dim")}
              className="flex items-center gap-1 p-2 hover:bg-primary hover:text-muted m-1 rounded-sm"
            >
              <SunMoon className="h-5 w-5" /> Dim
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
