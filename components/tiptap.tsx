// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from "react";
import {BubbleMenu, EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {Link} from "@tiptap/extension-link";
import Container from "@/components/ui/container";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Separator} from "@/components/ui/separator";
import HoverDropDown from "@/components/ui/hoverDropdown";
import {Button} from "@/components/ui/button";
import {useFileMenu, useFiles} from "@/app/store";
import {tiptapType} from "@/types";
import {Placeholder} from "@tiptap/extension-placeholder";
import {CharacterCount} from "@tiptap/extension-character-count";
import Dropcursor from '@tiptap/extension-dropcursor'
import {
    Bold,
    Italic,
    Strikethrough,
    Pilcrow,
    Heading1,
    Heading2,
    Heading3,
    AlignJustify,
    List, CodeXml,
    Undo, Redo
} from "lucide-react";

// Creating and exporting tiptap component (editor) as default
export default function Tiptap():ReactNode {
    // Getting data from zustand
    const {activeFile} = useFileMenu();
    const {files, setContent} = useFiles();

    // Defining editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            Link,
            Dropcursor,
            Placeholder.configure({
                placeholder: 'Write something ...',
                showOnlyWhenEditable: true,
                considerAnyAsEmpty: true
            })
        ],
        content: files.find((item) => item.name === activeFile)?.content,
        onUpdate: (e) => (editor?.getHTML()) ? setContent(activeFile, editor.getHTML()) : setContent(activeFile, '')
    })

    useEffect(() => {
        const val = files.find((item) => item.name === activeFile)?.content;
        (val) ? editor?.commands.setContent(val) : editor?.commands.setContent('<h1>Not Found</h1>')
    }, [files, activeFile]);

    // Conditional rendering
    return (
        <Container className={'editor'}>
            {
                editor && (
                    <BubbleMenu
                        className={'dark:bg-black bg-white rounded-lg p-[5px] border dark:border-white/20 border-black/20'}
                        editor={editor} tippyOptions={{duration: 500}}>
                        <ToggleGroup type="multiple">
                            <HoverDropDown icon={<Pilcrow className={'w-4 h-4'}/>}>
                                <span className={'text-sm text-muted-foreground mb-[5px] block'}>HIERARCHY</span>
                                <Button variant={'ghost'}
                                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                                        className={'flex items-center gap-2 w-full'}>
                                    <Heading1 className={'w-4 h-4 shrink-0'}/>
                                    <span className={'truncate block w-full text-start'}>Heading 1</span>
                                </Button>
                                <Button variant={'ghost'}
                                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                                        className={'flex items-center gap-2 w-full'}>
                                    <Heading2 className={'w-4 h-4 shrink-0'}/>
                                    <span className={'truncate block w-full text-start'}>Heading 2</span>
                                </Button>
                                <Button variant={'ghost'}
                                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                                        className={'flex items-center gap-2 w-full'}>
                                    <Heading3 className={'w-4 h-4 shrink-0'}/>
                                    <span className={'truncate block w-full text-start'}>Heading 3</span>
                                </Button>
                                <Separator orientation={'horizontal'} className={'my-4'}/>
                                <span className={'text-sm text-muted-foreground mb-[5px] block'}>LISTS</span>
                                <Button variant={'ghost'}
                                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                                        className={'flex items-center gap-2 w-full'}>
                                    <List className={'w-4 h-4 shrink-0'}/>
                                    <span className={'truncate block w-full text-start'}>Bullet list</span>
                                </Button>
                                <Button variant={'ghost'}
                                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                        className={'flex items-center gap-2 w-full'}>
                                    <AlignJustify className={'w-4 h-4 shrink-0'}/>
                                    <span className={'truncate block w-full text-start'}>Numbred list</span>
                                </Button>
                            </HoverDropDown>
                            <Separator orientation={'vertical'}/>
                            <Button variant={'ghost'} size={'icon'} onClick={() => editor.chain().focus().toggleBold().run()} value="bold"
                                             aria-label="Toggle bold">
                                <Bold className="h-4 w-4"/>
                            </Button>
                            <Button variant={'ghost'} size={'icon'} onClick={() => editor.chain().focus().toggleItalic().run()} value="italic"
                                             aria-label="Toggle italic">
                                <Italic className="h-4 w-4"/>
                            </Button>
                            <Button variant={'ghost'} size={'icon'} onClick={() => editor.chain().focus().toggleStrike().run()}
                                             value="underline" aria-label="Toggle underline">
                                <Strikethrough className="h-4 w-4"/>
                            </Button>
                            <Button variant={'ghost'} size={'icon'} onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                             value="underline" aria-label="Toggle underline">
                                <CodeXml className="h-4 w-4"/>
                            </Button>
                            <Separator orientation={'vertical'}/>
                            <Button variant={'ghost'} size={'icon'} onClick={() => editor.chain().focus().undo().run()}
                                             value="underline" aria-label="Toggle underline">
                                <Undo className="h-4 w-4"/>
                            </Button>
                            <Button variant={'ghost'} size={'icon'} onClick={() => editor.chain().focus().redo().run()}
                                             value="underline" aria-label="Toggle underline">
                                <Redo className="h-4 w-4"/>
                            </Button>
                        </ToggleGroup>
                    </BubbleMenu>
                )
            }
            <EditorContent placeholder={'asdasd'} editor={editor}/>
            <div className="character-count">
                {editor?.storage.characterCount.characters()} characters
                <br/>
                {editor?.storage.characterCount.words()} words
            </div>
        </Container>
    );
}