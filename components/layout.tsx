// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from 'react';
import TopMenu from "@/components/topMenu";
import FileMenu from "@/components/fileMenu";
import Tiptap from "@/components/tiptap";
import {useFileMenu, useFiles} from "@/app/store";

// Creating and exporting layout component as default
export default function Layout():ReactNode {
    // Getting data of files
    const {files} = useFiles();
    const {activeFile} = useFileMenu();

    // Returning JSX
    return (
        <div className={'flex flex-col overflow-hidden h-dvh'}>
            <TopMenu/>
            <div className={'lg:grid grid-cols-4 h-[calc(100%-2.5rem)]'}>
                <FileMenu/>
                <div className={'backdrop-blur-2xl col-span-3 overflow-auto custom-scroll h-full'}>
                    {
                        files.map((item, index) => (
                            <Tiptap
                                key={index}
                                isOpened={(item.name === activeFile)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}