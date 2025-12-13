// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { FormEvent, JSX, useState } from "react";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Send } from "lucide-react";
import { NoteCreatorProps } from "@/type/component";
import { cn } from "@/lib/util";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import useLocalStorageState from "use-local-storage-state";
import { NoteType } from "@/type/general";
import { toast } from "sonner";

// Creating and exporting NoteCreator component as default
export default function NoteCreator({
  className,
}: NoteCreatorProps): JSX.Element {
  // Defining hooks
  const [inputValue, setInputValue] = useState<string>("");
  const [notes, setNotes] = useLocalStorageState<NoteType[]>("notes");

  // Defining submitHandler
  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue === "" || inputValue.startsWith(" ")) {
      toast.error("Check your input .");
    } else {
      const notesCopy = notes ? [...notes] : [];

      setNotes([
        ...notesCopy,
        {
          createdAt: new Date().toISOString(),
          id: notesCopy.length + 1,
          message: inputValue,
        },
      ]);

      setInputValue("");
    }
  }

  // Returning JSX
  return (
    <form
      action="#"
      className={cn("flex items-center justify-between gap-3", className)}
      onSubmit={submitHandler}
    >
      <Input
        placeholder="What's on your mind ?"
        className="h-10 flex-1"
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"default"} size={"icon-lg"} className="shrink-0">
            <Send />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save</TooltipContent>
      </Tooltip>
    </form>
  );
}
