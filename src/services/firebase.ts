import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: `${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: `${process.env.NEXT_PUBLIC_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
