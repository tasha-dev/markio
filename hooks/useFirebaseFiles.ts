// Codes by mahdi tasha
// Importing part
import {useEffect, useState} from "react";
import useFirebase from "@/hooks/useFirebase";
import useUser from "@/hooks/useUser";
import {getDatabase, onValue, ref} from "firebase/database";

// Creating and exporting useFiresFiles as default
export default function useFirebaseFiles(): {
    loading: boolean,
    files: {
        name: string;
        content: string;
    }[]
} {
    // Defining states of component
    const [loading, setLoading] = useState<boolean>(true);
    const [files, setFiles] = useState<{name: string;content: string;}[]>([]);

    // Defining firebase
    const app = useFirebase();
    const user = useUser();

    // Using useEffect to get files
    useEffect(() => {
        if (!user.loading && user.user) {
            const db = getDatabase();
            const dbRef = ref(db, `/${user.user.uid}`);

            onValue(dbRef, (snapshot) => {
                const val = snapshot.val();

                setFiles(val);
                setLoading(false);
            })
        }
    }, [user.loading]);

    // Returning part
    return {loading, files};
}