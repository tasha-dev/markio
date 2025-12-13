// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";

// Creating and exporting the of props of components
export interface RootLayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  className?: string;
}

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export interface NoteCreatorProps {
  className?: string;
}
