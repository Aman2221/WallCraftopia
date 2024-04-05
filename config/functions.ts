import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ErrorToast } from "@/services/toast";
import { wall_paper } from "@/interfaces";

export const addUserToDb = async (name: string, email: string, isVerified: boolean, photoURL: string, uid: string) => {
    try {
        await setDoc(doc(db, "users", uid), {
            name: name,
            email: email,
            isVerified: isVerified,
            photoURL: photoURL && photoURL.length ? photoURL : "",
            uid: uid && uid.length ? uid : "",
            favourites: [],
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            ErrorToast(`${errorCode}, ${errorMessage}`);
        });
    }
    catch (e) {
        console.log("Error in addUserToDb", e)
    }
}

export const addToFavourite = async (URL: string) => {
    const uid = JSON.parse(localStorage.getItem("user") as string)?.uid;
    console.log("uid", uid)
    try {
        const docRef = doc(db, 'users', uid);
        await updateDoc(docRef, {
            favourites: arrayUnion(URL)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            ErrorToast(`${errorCode}, ${errorMessage}`);
        });
    }
    catch (e) {
        console.log("Error in addUserToDb", e)
    }
}

export const getUserFavourite = async () => {
    const uid = JSON.parse(localStorage.getItem("user") as string)?.uid;
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    }
    catch (e) {
        console.log("Error in addUserToDb", e)
    }
}

export const formateWallpaper = (item: any) => {
    return {
        id: item.id as string,
        url: item.urls.full as string,
        favourite: "false",
        desc: item.description as string
    }
}

export const getWallpapers = (wallPapData: wall_paper[], pageNumber: number) => {
    fetch(
        `https://api.unsplash.com/search/photos?page=${pageNumber}&query="phone-wallpaper"&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
    )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            data.results.forEach((item: any) => {
                const temp: wall_paper = formateWallpaper(item);
                wallPapData.push(temp);
            });
        });
};