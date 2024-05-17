// Codes by mahdi tasha
// Importing part
import {User} from "firebase/auth";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// Creating and exporting useUser hook as default
export default function useUser():{
    loading: boolean;
    user: User | null;
} {
    // Defining states of component
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Using useEffect to get user
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (userProp) => {
            setUser(userProp);
            setLoading(false);
        })
    }, []);

    // Returning user and loading state
    return {
        loading: loading,
        user: user
    };
}