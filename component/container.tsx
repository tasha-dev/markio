// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { ContainerProps } from "@/type/component";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";
import Header from "./header";

// Creating and exporting Container component as default
export default function Container({
  children,
  className,
}: ContainerProps): JSX.Element {
  // Defining hooks
  const [layout] = useLocalStorageState<"sm" | "lg">("layout");

  // Returning JSX
  return (
    <div
      className={cn(
        "transition-all duration-500 mx-auto p-5",
        layout === "sm" ? "lg:max-w-3xl w-full" : "w-full max-w-full",
        className,
      )}
    >
      <Header className="mb-10" />
      {children}
    </div>
  );
}
