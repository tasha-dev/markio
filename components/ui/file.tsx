// Codes by mahdi tasha
// Importing part
import {ReactNode} from 'react';
import {fileType} from "@/types";
import {File as FileIcon} from 'lucide-react';

// Creating and exporting file component as default
export default function File({name, content, active = false}:fileType):ReactNode {
    // Returning JSX
    return (
        <li className={'block w-full'}>
            <button
                data-active={active}
                className={'flex w-full items-center gap-[10px] px-[12px] py-[10px] transition-all duration-500 dark:text-white text-black dark:hover:bg-white/20 hover:bg-black/20 dark:data-[active="true"]:bg-white/20 data-[active="true"]:bg-black/20'}
            >
                <FileIcon className={'w-4 h-4 shrink-0'} color={'currentColor'} />
                <span className={"text-sm text-start font-medium w-full leading-none truncate text-current"}>{name}</span>
            </button>
        </li>
    );
}