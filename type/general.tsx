// Codes by mahdi tasha
// Creating and exporting the of general things
export interface NoteType {
  createdAt: string;
  message: string;
  id: number;
}

export interface GroupedNotes {
  date: string;
  data: NoteType[];
}
