// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
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


// Creating and exporting top side menu as default
export default function TopMenu():ReactNode {
    // Returning JSX
    return (
        <Menubar>
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
        </Menubar>
    );
}