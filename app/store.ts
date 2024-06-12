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
    activeFile: string;
    changeActive: (name:string) => void;
}

type File = {
    name: string;
    content: string;
};

// Define the type for the useFirebaseFiles store
type FilesStore = {
    files: File[];
    add: (name: string, content: string) => void;
    remove: (name: string) => void;
    setContent: (name: string, content: string) => void;
    rename: (prevName: string, newName: string) => void;
    setFiles: (files:File[]) => void;
};

// Defining states
export const useTheme = create<themeStoreType>()((set) => ({
    theme: 'dark',
    changeTheme: () => set((state) => ({
        theme: (state.theme === 'dark') ? 'light' : 'dark'
    }))
}))

export const useFileMenu = create<fileMenuStoreType>()((set) => ({
    opened: false,
    activeFile: 'Welcome',
    changeOpen: () => set((state) => ({
        opened: !state.opened
    })),
    changeActive: (name) => set((state) => ({
        activeFile: name
    }))
}))

export const useFiles = create<FilesStore>((set, get) => ({
    files: [],

    add: (name, content) => {
        const newFile: File = {name, content};
        set(state => ({files: [...state.files, newFile]}));
    },

    remove: (name) => {
        set(state => ({files: state.files.filter(file => file.name !== name)}));
    },

    setContent: (name, content) => {
        set(state => ({
            files: state.files.map(file =>
                file.name === name ? {...file, content} : file
            )
        }));
    },

    rename: (prevName, newName) => {
        set(state => ({
            files: state.files.map(file =>
                file.name === prevName ? {...file, name: newName} : file
            )
        }));
    },

    setFiles: (files) => {
        set(() => ({
            files: files
        }))
    }
}));
