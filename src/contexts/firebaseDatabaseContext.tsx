import React, { createContext, useRef } from "react";
import firebase from 'firebase/app';

export const FirebaseDBContext = createContext<any>(null);

export function GlobalProviderFirebaseDB({ children }: { children: React.ReactNode }) {
    const database = useRef(firebase.database());

    return (
        <FirebaseDBContext.Provider value={database.current}>
            { children }
        </FirebaseDBContext.Provider>
    );

}