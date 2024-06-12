// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useState} from 'react';
import {hoverDropDownType} from "@/types";
import {Button} from '@/components/ui/button';

// Creating and exporting hover dropdown component as default
export default function HoverDropDown({icon, children}:hoverDropDownType):ReactNode {
    // Defining states of component
    const [isOpened, setOpened] = useState<boolean>(false);

    // Returning JSX
    return (
        <div className={'relative group'}>
            <Button 
              onClick={() => setOpened(prev => !prev)}
              onFocus={() => setOpened(true)}
              onBlur={() => setOpened(false)}
              onMouseOver={() => setOpened(true)}
              onMouseLeave={() => setOpened(false)}
              size={'icon'} 
              variant={'ghost'}
            >
                {icon}
            </Button>
            <div 
              onMouseOver={() => setOpened(true)}
              onMouseLeave={() => setOpened(false)}
              onFocus={() => setOpened(true)}
              onBlur={() => setOpened(false)}
              data-opened={isOpened} 
              className={'pt-[20px] absolute top-full left-0 data-[opened="false"]:invisible transition-all duration-500 data-[opened="false"]:opacity-0 data-[opened="true"]:opacity-100 data-[opened="true"]:visible'}
            >
                <div className={'p-2 dark:bg-black bg-white rounded-md w-[200px]'}>
                    {children}
                </div>
            </div>
        </div>
    );
}
