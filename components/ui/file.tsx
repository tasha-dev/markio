// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from 'react';
import {fileType} from "@/types";
import {File as FileIcon} from 'lucide-react';
import {useFileMenu} from "@/app/store";

// Creating and exporting file component as default
export default function File({name, active = false}:fileType):ReactNode {
    // Getting state of menu
    const {changeActive} = useFileMenu();

    // Returning JSX
    return (
        <li className={'block w-full'}>
            <button
                onClick={() => changeActive(name)}
                data-active={active}
                className={'flex w-full items-center gap-[10px] px-[12px] py-[10px] transition-all duration-500 dark:text-white text-black dark:hover:bg-white/20 hover:bg-black/20 dark:data-[active="true"]:bg-white/20 data-[active="true"]:bg-black/20'}
            >
                <FileIcon className={'w-4 h-4 shrink-0'} color={'currentColor'} />
                <span className={"text-sm text-start font-medium w-full leading-none truncate text-current"}>{name}</span>
            </button>
        </li>
    );
}