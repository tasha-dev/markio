// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Container from "@/component/container";
import Note from "@/component/note";
import NoteCreator from "@/component/noteCreator";
import { groupNotesByDay } from "@/lib/util";
import { NoteType } from "@/type/general";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";

// Animation variants for list items
const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 }, // Start slightly down and small
  animate: { opacity: 1, y: 0, scale: 1 }, // Normal state
  exit: { opacity: 0, y: -20, scale: 0.95 }, // Exit slightly up and small
};

// Animation for the list container
const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1, // Delay between each item's animation
    },
  },
};

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
            <span className="font-bold text-lg text-foreground mb-3 block truncate">
              {moment(item.date).format("YYYY MMMM DD")}
            </span>
            <AnimatePresence>
              <motion.div
                className="space-y-5"
                variants={listVariants}
                initial="initial" // You can set initial on the list too if needed
                animate="animate" // This triggers the stagger
              >
                {item.data.map((innerItem, innerIndex) => (
                  <motion.div
                    key={innerIndex}
                    variants={itemVariants}
                    initial="initial" // Starting state
                    animate="animate" // Settled state
                    exit="exit" // Leaving state
                    layoutId={`item-${innerIndex}`}
                  >
                    <Note data={innerItem} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Container>
  );
}
