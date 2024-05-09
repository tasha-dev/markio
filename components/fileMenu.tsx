// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import File from "@/components/ui/file";

// Creating and exporting file menu component as default
export default function FileMenu():ReactNode {
    // Returning JSX
    return (
        <div className={'h-full backdrop-blur-2xl border-r dark:border-r-white/20 border-r-black/20 overflow-auto custom-scroll'}>
            <ul className={'flex flex-col'}>
                <File name={'HI'} content={'## Hello world'} active />
                <File name={'HI'} content={'## Hello world'} />
            </ul>
        </div>
    );
}