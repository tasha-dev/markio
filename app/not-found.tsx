// Codes by mahdi tasha
// Importing part
import Container from "@/component/container";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { JSX } from "react";

// Creating and exporting Home page as default
export default function HomePage(): JSX.Element {
  // Returning JSX
  return (
    <Container>
      <h1 className="text-2xl font-normal text-foreground text-center mb-4">
        The page you are looking for <br />{" "}
        <span className="inline-block font-bold">is not found !</span>
      </h1>
      <Button asChild className="w-fit mx-auto block">
        <Link href="/">Head home</Link>
      </Button>
    </Container>
  );
}
