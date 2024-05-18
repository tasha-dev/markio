// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client"

// Importing part
import {useState, useEffect, ReactNode} from "react"
import {File} from "lucide-react"
import {CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Button} from "@/components/ui/button";
import {useFileMenu, useFiles} from "@/app/store";

// Creating and exporting find component as default
export default function Find():ReactNode {
    // Defining states of component
    const [open, setOpen] = useState(false)

    // Defining zustand
    const {files} = useFiles();
    const {changeActive} = useFileMenu();

    // Using useEffect to open modal on ctrl + k
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // Returning JSX
    return (
        <div>
            <Button onClick={() => setOpen(prevState => !prevState)} variant={'ghost'} className={'h-[2rem]'}>Find</Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Finded">
                        {
                            files.map((item, index) => (
                                <CommandItem onSelect={() => {
                                    setOpen(false);
                                    changeActive(item.name);
                                }} key={index}>
                                    <File className="mr-2 h-4 w-4" />
                                    <span>{item.name}</span>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}

