// Codes by mahdi tasha
// Importing part
import { GroupedNotes, NoteType } from "@/type/general";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Creating and exporting cn function which takes array of class values and joins them together
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Creating and exporting groupNotesByDay function which takes array of notes and groups them based on days
export function groupNotesByDay(notes: NoteType[]): GroupedNotes[] {
  const grouped: Record<string, NoteType[]> = {};

  notes.forEach((note) => {
    const day = new Date(note.createdAt).toISOString().split("T")[0];
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(note);
  });

  return Object.entries(grouped).map(([date, data]) => ({
    date,
    data,
  }));
}
