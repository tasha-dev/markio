// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import {User} from 'firebase/auth';

// Defining type of components and exporting them
export interface rootLayoutType {children: ReactNode;}
export interface userType {loading: boolean;user: User | null;}
export interface topMenuType {user: userType}
export interface fileMenuType {user: userType}
export interface useFilesType {user: userType;}
export interface tipTapType {user: userType;}
export interface fileType {
    name: string;
    content: string;
    active?: boolean;
    index: number;
    user: userType;
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