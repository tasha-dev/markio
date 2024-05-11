// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {Button} from "@/components/ui/button";
import {Sun, Moon, AlignJustify} from "lucide-react";
import {useFileMenu, useFiles, useTheme} from "@/app/store";

// Creating and exporting top side menu as default
export default function TopMenu():ReactNode {
    // Defining states of component
    const {theme, changeTheme} = useTheme();
    const {changeOpen} = useFileMenu();

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
                <MenubarTrigger onClick={() => alert('asd')}>Auth</MenubarTrigger>
            </MenubarMenu>
            <Button
                onClick={changeTheme}
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
            <Button
                onClick={changeOpen}
                size={'icon'}
                variant={'ghost'}
                className={'rounded-none lg:hidden flex'}
            >
                <AlignJustify className={'w-4 h-4'} color={'currentColor'} />
            </Button>
        </Menubar>
    );
}