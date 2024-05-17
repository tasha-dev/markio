// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from 'react';
import TopMenu from "@/components/topMenu";
import FileMenu from "@/components/fileMenu";
import Tiptap from "@/components/tiptap";
import useFirebase from "@/hook/useFirebase";
import useUser from "@/hook/useUser";

// Creating and exporting layout component as default
export default function Layout():ReactNode {
    // Defining firebase
    const app = useFirebase();
    const user = useUser();

    // Returning JSX
    return (
        <div className={'flex flex-col overflow-hidden h-dvh'}>
            <TopMenu user={user} />
            <div className={'lg:grid grid-cols-4 h-[calc(100%-2.5rem)]'}>
                <FileMenu/>
                <div className={'backdrop-blur-2xl col-span-3 overflow-auto custom-scroll h-full'}>
                    <Tiptap />
                </div>
            </div>
        </div>
    );
}