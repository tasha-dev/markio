// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { GalleryHorizontal } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";
import { useMediaQuery } from "@/hook/useMediaQuery";

// Creating and exporting LayoutToggler component as default
export default function LayoutToggler(): ReactNode {
  // Defining hooks
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [, setLayout] = useLocalStorageState<"sm" | "lg">("layout", {
    defaultValue: "sm",
  });

  // Returning JSX
  if (isLg) {
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
        <TooltipContent>Toogle layout size</TooltipContent>
      </Tooltip>
    );
  }
}
