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

// Define the type for the useFiles store
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
    files: [{
        name: 'Welcome',
        content: `
            <h1>Markio</h1>
            <p>Markio is a lightweight, efficient note-taking app built with React, Next.js, and TailwindCSS, designed to help you capture and organize your thoughts with ease. It uses Firebase for secure back-end data storage and Zustand for state management.</p>
            <h2>Features</h2>
            <ul>
                <li><b>Efficient Note-Taking:</b> Quickly jot down your thoughts, ideas, and tasks.</li>
                <li><b>Persistent Storage:</b> All notes are stored securely in Firebase and are accessible across devices.</li>
                <li><b>Export Options:</b> Easily export your notes to Markdown (.md) or PDF (.pdf) formats.</li>
                <li><b>Modern UI:</b> A sleek, responsive interface built with TailwindCSS.</li>
            </ul>
            <h2>Tech Stack</h2>
            <ul>
                <li><b>Frontend</b>: React + Next.js + TailwindCSS</li>
                <li><b>State Management</b>: Zustand</li>
                <li><b>Backend</b> : Firebase</li>
                <li><b>Typescript</b> : Ensures type safety across the app.</li>
            </ul>
            <h2>Contributing</h2>
            <p>We welcome contributions to Markio. Whether it's submitting bugs, proposing new features, or improving documentation, here's how you can contribute:</p>
            <ul>
                <li>Fork the Project</li>
                <li>Create your Feature Branch (git checkout -b feature/AmazingFeature)</li>
                <li>Commit your Changes (git commit -m 'Add some AmazingFeature')</li>
                <li>Push to the Branch (git push origin feature/AmazingFeature)</li>
                <li>Open a Pull Request</li>
            </ul>
            <h2>Contact</h2>
            <p>
                Mahdi Tasha -
                <a href="https://tasha.vercel.app/">Portfolio</a>
            </p>
        `
    }],

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
