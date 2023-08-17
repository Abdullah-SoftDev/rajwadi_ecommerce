import { db } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const fetchUserData = async (user: User, setUserData: Function) => {
    if (user) {
        const userDocRef = doc(db, "users", user?.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData: User = userDocSnapshot.data() as User;
            setUserData(userData);
        } else {
            console.log("User document does not exist.");
        }
    }
};
