// Codes by mahdi tasha
// Importing part
import {firebaseConfig} from "@/configs";
import {FirebaseApp, initializeApp} from "firebase/app";
import {useEffect, useState} from "react";

// Defining useFirebase hook to set up the firebase and exporting it as default
export default function useFirebase():FirebaseApp | undefined {
    // Defining states of component
    const [app, setApp] = useState<FirebaseApp | undefined>();

    // Using useEffect to set app state
    useEffect(() => {
        setApp(initializeApp(firebaseConfig));
    }, []);

    // Returning app state
    return app;
}