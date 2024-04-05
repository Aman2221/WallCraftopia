import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
    OAuthCredential,
    UserCredential,
} from "firebase/auth";
import { addUserToDb } from "./functions";
import { ErrorToast, SuccessToast } from "@/services/toast";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const handleLoginWithGoogle = (router: any) => {
    signInWithPopup(auth, provider)
        .then((result: UserCredential) => {
            const credential: OAuthCredential | null =
                GoogleAuthProvider.credentialFromResult(result);
            const token = credential ? credential?.accessToken : "";
            const user = result?.user;
            addUserToDb(user.displayName as string, user.email as string, user.emailVerified, user.photoURL as string, user.uid)
            localStorage.setItem("user", JSON.stringify(user));
            SuccessToast("User logged in Successfully");
            router.push("/")
            // redirect("/");
            // setTimeout(() => redirect("/"), 1000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            ErrorToast(`${errorCode}, ${errorMessage}`)
            // const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};