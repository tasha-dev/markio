// Codes by mahdi tasha
// Importing part
import Container from "@/component/container";
import NoteCreator from "@/component/noteCreator";
import { JSX } from "react";

// Creating and exporting Home page as default
export default function HomePage(): JSX.Element {
  // Returning JSX
  return (
    <Container>
      <NoteCreator />
      <hr className="border-foreground/10 my-5" />
    </Container>
  );
}
