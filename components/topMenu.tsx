// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect, useState} from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {Button} from "@/components/ui/button";
import {Sun, Moon} from "lucide-react";

// Creating and exporting top side menu as default
export default function TopMenu():ReactNode {
    // Defining states of component
    const [theme, setTheme] = useState<'dark'|'light'>("dark");

    // Using useEffect to add dark/light class names to html element
    useEffect(() => {
        const htmlElement = document.documentElement;
        (theme === 'dark')
            ? htmlElement.classList.add('dark')
            : htmlElement.classList.remove('dark')
    }, [theme]);

    // Returning JSX
    return (
        <Menubar className={'shrink-0'}>
            <MenubarMenu>
                <MenubarTrigger>Auth</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Login</MenubarItem>
                    <MenubarItem>Sign up</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Use</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Export</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>To .pdf</MenubarItem>
                            <MenubarItem>To .md</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem>Publish to github</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <Button
                onClick={() => setTheme(prevState => (prevState === 'dark') ? 'light' : 'dark')}
                size={'icon'}
                variant={'ghost'}
                className={'rounded-none'}
            >
                {
                    (theme === 'dark')
                        ? <Sun className={'w-4 h-4'} color={'currentColor'} />
                        : <Moon className={'w-4 h-4'} color={'currentColor'} />
                }
            </Button>
        </Menubar>
    );
}