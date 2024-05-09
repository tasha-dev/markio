// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {BubbleMenu, EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import Container from "@/components/ui/container";
import {Bold, Italic, Pilcrow, Strikethrough} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Creating and exporting tiptap component (editor) as default
export default function Tiptap():ReactNode {
    // Defining editor
    const editor = useEditor({
        extensions: [StarterKit,],
        content: '',
    })

    // Returning JSX
    return (
        <Container className={'editor'}>
            {
                editor && (
                    <BubbleMenu className={'dark:bg-black bg-white rounded-lg p-[5px] border dark:border-white/20 border-black/20 overflow-hidden'} editor={editor} tippyOptions={{ duration: 500 }}>
                        <ToggleGroup type="multiple">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <Pilcrow className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>HIERARCHY</DropdownMenuLabel>
                                    <DropdownMenuItem>CLiKC</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>LISTS</DropdownMenuLabel>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Separator orientation={'vertical'} />
                            <ToggleGroupItem onClick={() => editor.chain().focus().toggleBold().run()} value="bold" aria-label="Toggle bold">
                                <Bold className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={() => editor.chain().focus().toggleItalic().run()} value="italic" aria-label="Toggle italic">
                                <Italic className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={() => editor.chain().focus().toggleStrike().run()} value="underline" aria-label="Toggle underline">
                                <Strikethrough className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </BubbleMenu>
                )
            }
            <EditorContent editor={editor}/>
        </Container>
    );
}