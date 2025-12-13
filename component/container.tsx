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
        layout === "sm"
          ? "mx-auto lg:max-w-3xl lg:pt-6 lg:p-3 pt-5 p-5"
          : "w-full p-5",
        className,
      )}
    >
      <Header className="mb-10" />
      {children}
    </div>
  );
}
