// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Container from "@/component/container";
import Note from "@/component/note";
import NoteCreator from "@/component/noteCreator";
import { groupNotesByDay } from "@/lib/util";
import { NoteType } from "@/type/general";
import moment from "moment";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting Home page as default
export default function HomePage(): JSX.Element {
  // Defining hooks
  const [notes] = useLocalStorageState<NoteType[]>("notes");
  const dataToRender = notes ? groupNotesByDay(notes) : [];

  // Returning JSX
  return (
    <Container>
      <NoteCreator />
      <hr className="border-foreground/10 my-5" />
      <div className="space-y-5">
        {dataToRender.map((item, index) => (
          <div
            key={index}
            className={
              dataToRender.length !== index + 1
                ? "border-b border-b-foreground/20 pb-5"
                : ""
            }
          >
            <span className="font-bold text-lg text-foreground mb-3 block">
              {moment(item.date).format("YYYY MMMM DD")}
            </span>
            <div className="space-y-5">
              {item.data.map((innerItem, innerIndex) => (
                <Note data={innerItem} key={innerIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
