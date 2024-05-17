// Codes by mahdi tasha
// Importing part
import {useEffect, useState} from "react";
import {useFilesType} from "@/types";
import {getDatabase, onValue, ref} from "@firebase/database";

// Creating and exporting useFirebaseFiles custom hook as default
export default function useFirebaseFiles({user}:useFilesType):[{
    name: string;
    content: string;
}] | [] {
    // Defining states of component
    const [files, setFiles] = useState<[{
        name: string;
        content: string;
    }] | undefined | null>();

    // Using useEffect hook to get files from database
    useEffect(() => {
        if (!user.loading && user.user) {
            const db = getDatabase();
            const dbRef = ref(db, `/${user.user.uid}`);

            onValue(dbRef, (snapshot) => {
                setFiles(snapshot.val());
            })
        }
    }, [user.loading]);

    // Returning part
    return (files) ? files : [];
}