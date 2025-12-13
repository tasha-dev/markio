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
        layout === "sm" ? "mx-auto max-w-3xl pt-6 p-3" : "w-full p-5",
        className,
      )}
    >
      <Header />
      {children}
    </div>
  );
}
