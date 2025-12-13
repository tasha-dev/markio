// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Container from "@/component/container";
import Note from "@/component/note";
import NoteCreator from "@/component/noteCreator";
import { NoteType } from "@/type/general";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting Home page as default
export default function HomePage(): JSX.Element {
  // Defining hooks
  const [notes] = useLocalStorageState<NoteType[]>("notes");
  const dataToRender = notes ? notes.reverse() : [];

  // Returning JSX
  return (
    <Container>
      <NoteCreator />
      <hr className="border-foreground/10 my-5" />
      <div className="space-y-5">
        {dataToRender.map((item, index) => (
          <Note key={index} data={item} />
        ))}
      </div>
    </Container>
  );
}
