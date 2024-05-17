// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import {User} from 'firebase/auth';

// Defining type of components and exporting them
export interface rootLayoutType {children: ReactNode;}
export interface tiptapType {isOpened: boolean;}
export interface fileType {
    name: string;
    content: string;
    active?: boolean;
}

export interface containerType {
    size?: 'sm' | 'lg';
    children: ReactNode;
    className?: string;
}

export interface hoverDropDownType {
    children: ReactNode;
    icon: ReactNode;
}

export interface topMenuType {
    user: {
        loading: boolean;
        user: User | null;
    }
}