// Codes by mahdi tasha
// Importing part
import {ReactNode} from 'react';
import {hoverDropDownType} from "@/types";
import {Button} from '@/components/ui/button';

// Creating and exporting hover dropdown component as default
export default function HoverDropDown({icon, children}:hoverDropDownType):ReactNode {
    // Returning JSX
    return (
        <div className={'relative group'}>
            <Button size={'icon'} variant={'ghost'}>
                {icon}
            </Button>
            <div className={'pt-[20px] absolute top-full left-0 invisible transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:visible'}>
                <div className={'p-2 dark:bg-black bg-white rounded-md w-[200px]'}>
                    {children}
                </div>
            </div>
        </div>
    );
}