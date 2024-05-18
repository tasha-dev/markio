// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from 'react';
import TopMenu from "@/components/topMenu";
import FileMenu from "@/components/fileMenu";
import Tiptap from "@/components/tiptap";
import useFirebase from "@/hook/useFirebase";
import useUser from "@/hook/useUser";
import {useFiles} from "@/app/store";
import {getDatabase, onValue, ref} from "@firebase/database";

// Creating and exporting layout component as default
export default function Layout():ReactNode {
    // Defining zustand
    const {setFiles} = useFiles();

    // Defining firebase
    const app = useFirebase();
    const user = useUser();

    // Using useEffect to set files to zustand store
    useEffect(() => {
        if (!user.loading && user.user) {
            const db = getDatabase();
            const dbRef = ref(db, `/${user.user.uid}`);

            onValue(dbRef, (snapshot) => {
                const val = snapshot.val();

                setFiles((val) ? Object.values(val) : []);
            })
        }
    }, [user.loading]);

    // Returning JSX
    return (
        <div className={'flex flex-col overflow-hidden h-dvh'}>
            <TopMenu user={user} />
            <div className={'lg:grid grid-cols-4 h-[calc(100%-2.5rem)]'}>
                <FileMenu user={user} />
                <div className={'backdrop-blur-2xl col-span-3 overflow-auto custom-scroll h-full'}>
                    <Tiptap user={user} />
                </div>
            </div>
        </div>
    );
}