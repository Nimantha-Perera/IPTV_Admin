// app/hooks/admin_details.js
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { firestore } from "../firebase_connected/firebase"; // Ensure this path is correct
import useAuth from "./admin_auth";

export default function useAdminDetails() {
    const [adminDetails, setAdminDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  
    const { user } = useAuth(); 

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const q = query(collection(firestore, 'admins'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // Assuming there's only one document for the admin
                setAdminDetails(docs[0] || null);
            } catch (error) {
                setError("Failed to fetch admin details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return { adminDetails, loading, error };
}
