// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { ContainerProps } from "@/type/component";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";
import { motion } from "framer-motion";
import Header from "./header";
import { useMediaQuery } from "@/hook/useMediaQuery";

// Creating and exporting Container component as default
export default function Container({
  children,
  className,
}: ContainerProps): JSX.Element {
  // Defining hooks
  const [layout] = useLocalStorageState<"sm" | "lg">("layout");
  const isLg = useMediaQuery("(min-width: 1024px)");

  // Returning JSX
  return (
    <motion.div
      className={cn("mx-auto overflow-hidden p-5 w-full", className)}
      initial={{ maxWidth: !isLg ? "100%" : "50%" }}
      animate={{ maxWidth: !isLg ? "100%" : layout === "sm" ? "50%" : "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Header className="mb-10" />
      {children}
    </motion.div>
  );
}
