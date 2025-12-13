// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Container from "@/component/container";
import { JSX } from "react";

// Creating and exporting Home page as default
export default function HomePage(): JSX.Element {
  // Returning JSX
  return (
    <Container>
      <h1 className="text-2xl font-normal text-foreground text-center mb-4">
        Sorry ! <br /> <span className="font-bold">There was a problem !</span>
      </h1>
    </Container>
  );
}
