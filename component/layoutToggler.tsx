// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { GalleryHorizontal } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting LayoutToggler component as default
export default function LayoutToggler(): JSX.Element {
  // Defining hooks
  const [layout, setLayout] = useLocalStorageState<"sm" | "lg">("layout");

  // Returning JSX
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size={"icon-lg"}
          onClick={() => {
            setLayout((prev) => (prev === "sm" ? "lg" : "sm"));
          }}
        >
          <GalleryHorizontal />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle Layout</TooltipContent>
    </Tooltip>
  );
}
