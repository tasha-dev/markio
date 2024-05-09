// Codes by mahdi tasha
// Importing part
import {ReactNode} from 'react';
import {containerType} from "@/types";
import {cn} from "@/lib/utils";

// Creating and exporting container component as default
export default function Container({size = 'sm', className, children}:containerType):ReactNode {
    // Returning JSX
    return (
        <div className={cn(
            'mx-auto p-[20px]',
            (size === 'sm') ? 'max-w-[42rem]' : 'max-w-[1000px]',
            className
        )}>
            {children}
        </div>
    );
}