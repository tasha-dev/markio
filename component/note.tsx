// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { NoteProps } from "@/type/component";
import { NoteType } from "@/type/general";
import { X } from "lucide-react";
import moment from "moment";
import { JSX, useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

// Creating and exporting Note component as default
export default function Note({ data, className }: NoteProps): JSX.Element {
  // Defining hooks
  const [deleteDrawerOpened, setDeleteDrawerOpened] = useState<boolean>(false);
  const [notes, setNotes] = useLocalStorageState<NoteType[]>("notes");
  const [dateLabel, setDateLabel] = useState<string>(
    moment(data.createdAt).fromNow(),
  );

  // using useMemo to set dateLabel state and update it each 5000 ms (5 seconds)
  useMemo(() => {
    const interval = setInterval(() => {
      setDateLabel(moment(data.createdAt).fromNow());
    }, 60000);

    return () => clearInterval(interval);
  }, [data.createdAt]);

  // Returning JSX
  return (
    <div
      className={cn(
        "bg-secondary/80 py-3 px-4  rounded-md border-secondary flex items-start justify-between gap-3",
        className,
      )}
    >
      <div className="flex-1 overflow-hidden">
        <p className="text-base text-left text-foreground font-normal block w-full wrap-anywhere leading-7">
          {data.message}
        </p>
      </div>
      <div className="shrink-0 flex items-center justify-between gap-3 mt-1.5">
        <span className="text-right text-xs text-foreground/70 block font-light">
          {dateLabel}
        </span>
        <Drawer open={deleteDrawerOpened} onOpenChange={setDeleteDrawerOpened}>
          <DrawerTrigger asChild>
            <button className="text-foreground">
              <X className="size-4" color="currentColor" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="border lg:border-x border-x-0 border-b-none border-foreground/10 lg:max-w-2xl mx-auto">
            <DrawerHeader>
              <DrawerTitle>
                Are you sure you want to delete this note ?
              </DrawerTitle>
              <DrawerDescription>
                Once you delete this note , <br /> there is no way to bring it
                back.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                variant={"destructive"}
                onClick={() => {
                  const notesToSearch = notes ? [...notes] : [];
                  const removedArray = notesToSearch.filter(
                    (item) => item.id !== data.id,
                  );

                  setNotes(removedArray);
                  setDeleteDrawerOpened(false);
                }}
              >
                Delete
              </Button>
              <DrawerClose asChild>
                <Button variant={"secondary"}>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
