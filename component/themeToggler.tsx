// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

// Creating and exporting ThemeToggler component as default
export default function ThemeToggler(): JSX.Element {
  // Defining hooks
  const { setTheme } = useTheme();

  // Returning JSX
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size={"icon-lg"}
          onClick={() => {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
          }}
        >
          <SunMoon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  );
}
