// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { HeaderProps } from "@/type/component";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { JSX } from "react";
import ThemeToggler from "./themeToggler";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import Link from "next/link";
import LayoutToggler from "./layoutToggler";

// Creating and exporting Header component as default
export default function Header({ className }: HeaderProps): JSX.Element {
  // Returning JSX
  return (
    <header
      className={cn("flex items-center justify-between gap-3", className)}
    >
      <h1 className="truncate text-left block text-foreground font-bold text-2xl">
        Markio
      </h1>
      <div className="flex items-center justify-between gap-3">
        <ThemeToggler />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon-lg"} asChild>
              <Link href="https://tasha.vercel.app">
                <Code />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Made By Mahdi Tasha</TooltipContent>
        </Tooltip>
        <LayoutToggler />
      </div>
    </header>
  );
}
