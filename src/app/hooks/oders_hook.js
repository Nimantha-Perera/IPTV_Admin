import { useState, useEffect } from "react";
import { getFirestore, collection, query, onSnapshot, doc, updateDoc,where,getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebase_connected/firebase"; // Ensure you have firebase configured

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = [];
      snapshot.forEach((doc) => {
        newOrders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(newOrders);

      const pendingOrders = newOrders.filter(order => order.status === 'Pending').length;
      setNewOrdersCount(pendingOrders);
    });

    return () => unsubscribe();
  }, [db]);

  const handleConfirm = async (id) => {
    try {
      // Reference the 'orders' collection
      const ordersCollection = collection(db, 'orders');
      
      // Create a query to find the document where 'id' field matches the given value
      const q = query(ordersCollection, where('id', '==', id));
      
      // Execute the query
      const querySnapshot = await getDocs(q);
      
      // Check if a matching document is found
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      
      // Update the status for each matching document
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, 'orders', docSnapshot.id);
        
        // Update the status field of the document
        await updateDoc(docRef, { status: 'Confirmed' });
        
        console.log(`Order ${docSnapshot.id} status updated to 'Confirmed'.`);
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const resetNewOrdersCount = () => {
    setNewOrdersCount(0);
  };

  return {
    orders,
    newOrdersCount,
    resetNewOrdersCount,
    handleConfirm
  };
}