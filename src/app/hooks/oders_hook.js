// hooks/useOrders.js
import { useState, useEffect } from "react";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { firebaseApp } from "../firebase_connected/firebase"; // Ensure you have firebase configured

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const db = getFirestore(firebaseApp);
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
  }, []);

  const handleConfirm = async (id) => { 
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status: "Confirmed"
    });
    setNewOrdersCount(newOrdersCount - 1);
  }

  const resetNewOrdersCount = () => setNewOrdersCount(0);

  return {
    orders,
    newOrdersCount,
    resetNewOrdersCount,
    handleConfirm
  };
}
