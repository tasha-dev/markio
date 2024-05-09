// Codes by mahdi tasha
// Importing part
import {create} from 'zustand';

// Defining type of states
type themeStoreType = {
    theme: 'light' | 'dark';
    changeTheme: () => void;
}

type fileMenuStoreType = {
    opened: boolean;
    changeOpen: () => void;
}

// Defining states
export const useTheme = create<themeStoreType>()((set) => ({
    theme: 'dark',
    changeTheme: () => set((state) => ({
        theme: (state.theme === 'dark') ? 'light' : 'dark'
    }))
}))

export const useFileMenu = create<fileMenuStoreType>()((set) => ({
    opened: false,
    changeOpen: () => set((state) => ({
        opened: !state.opened
    }))
}))