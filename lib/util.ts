// Codes by mahdi tasha
// Importing part
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Creating and exporting cn function which takes array of class values and joins them together
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
