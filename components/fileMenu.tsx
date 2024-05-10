// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import File from "@/components/ui/file";
import {useFileMenu, useFiles} from "@/app/store";
import {cn} from "@/lib/utils";

// Creating and exporting file menu component as default
export default function FileMenu():ReactNode {
    // Getting data of opened or closed from zustand store
    const {opened, activeFile, changeOpen} = useFileMenu()

    // Gettind data of files from zustand
    const {files} = useFiles();

    // Returning JSX
    return (
        <div>
            <div
                data-opened={opened}
                onClick={changeOpen}
                className={'lg:hidden block transition-all duration-500 data-[opened="false"]:opacity-0 data-[opened="true"]:opacity-100 data-[opened="false"]:pointer-events-none data-[opened="true"]:pointer-events-auto  w-full z-[40] h-full dark:bg-white/20 bg-black/20 backdrop-blur-2xl fixed top-0 left-0'}
            />
            <div
                className={cn(
                    (opened)
                        ? 'left-0 opacity-100 visible'
                        : 'left-[-75%] lg:opacity-100 opacity-0 lg:visible invisible',
                    'lg:backdrop-blur-2xl lg:dark:bg-black/20 lg:bg-white/20 dark:bg-black bg-white h-full lg:border-r lg:dark:border-r-white/20 lg:border-r-black/20 overflow-auto lg:static fixed top-0 lg:z-0 z-50 transition-all duration-500 lg:w-auto w-[75%]'
                )}
            >
                {
                    (files.length === 0)
                        ? <h1 className={'text-[20px] font-medium dark:text-white text-black'}>There is nothing to show</h1>
                        : <ul className={'flex flex-col'}>
                            {
                                files.map((item ,index) => (
                                    <File
                                        key={index}
                                        name={item.name}
                                        content={item.content}
                                        active={item.name === activeFile}
                                    />
                                ))
                            }
                        </ul>
                }
            </div>
        </div>
    );
}