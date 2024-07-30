import { useState, useEffect } from "react";
import { getFirestore, collection, query, onSnapshot, doc, updateDoc, where, getDocs ,deleteDoc} from "firebase/firestore";
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

  const updateOrderStatus = async (order_id, newStatus) => {
    try {
      // Update status in the orders collection
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, where('order_id', '==', order_id));
      const ordersSnapshot = await getDocs(ordersQuery);
  
      if (ordersSnapshot.empty) {
        console.error(`No documents found with order_id: ${order_id} in orders collection`);
        return;
      }
  
      const updateOrdersPromises = ordersSnapshot.docs.map(async (orderDoc) => {
        const orderRef = orderDoc.ref;
        await updateDoc(orderRef, { status: newStatus });
      });
  
      await Promise.all(updateOrdersPromises);
  
      // Update status in the customers' ordered_foods subcollections
      const customersCollection = collection(db, 'customers');
      const customersSnapshot = await getDocs(customersCollection);
  
      if (customersSnapshot.empty) {
        console.error('No customer documents found');
        return;
      }
  
      const updateCustomersPromises = customersSnapshot.docs.map(async (customerDoc) => {
        const customerRef = customerDoc.ref;
        const orderedFoodsCollection = collection(customerRef, 'ordered_foods');
        const orderedFoodsQuery = query(orderedFoodsCollection, where('order_id', '==', order_id));
        const orderedFoodsSnapshot = await getDocs(orderedFoodsQuery);
  
        if (orderedFoodsSnapshot.empty) {
          console.log(`No documents found with order_id: ${order_id} in ordered_foods subcollection of customer ${customerDoc.id}`);
          return;
        }
  
        const updateOrderedFoodsPromises = orderedFoodsSnapshot.docs.map(async (orderedFoodDoc) => {
          const orderedFoodRef = orderedFoodDoc.ref;
          await updateDoc(orderedFoodRef, { status: newStatus });
        });
  
        await Promise.all(updateOrderedFoodsPromises);
      });
  
      await Promise.all(updateCustomersPromises);
  
      console.log(`Order status updated to ${newStatus} successfully for all matched documents and customers`);
    } catch (error) {
      console.error(`Error updating order status to ${newStatus}:`, error);
    }
  };

  const handleConfirm = async (order_id) => {
    await updateOrderStatus(order_id, 'Confirmed');
  };

  const handleCancel = async (order_id) => {
    await updateOrderStatus(order_id, 'Canceled');
  };

  const handleDelete = async (order_id) => {
    try {
      // Delete from orders collection
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, where('order_id', '==', order_id));
      const ordersSnapshot = await getDocs(ordersQuery);
  
      if (ordersSnapshot.empty) {
        console.error(`No documents found with order_id: ${order_id} in orders collection`);
        return;
      }
  
      const deleteOrdersPromises = ordersSnapshot.docs.map(async (orderDoc) => {
        const orderRef = orderDoc.ref;
        await deleteDoc(orderRef);
      });
  
      await Promise.all(deleteOrdersPromises);
  
      // Delete from customers' ordered_foods subcollections
      const customersCollection = collection(db, 'customers');
      const customersSnapshot = await getDocs(customersCollection);
  
      if (customersSnapshot.empty) {
        console.error('No customer documents found');
        return;
      }
  
      const deleteCustomersPromises = customersSnapshot.docs.map(async (customerDoc) => {
        const customerRef = customerDoc.ref;
        const orderedFoodsCollection = collection(customerRef, 'ordered_foods');
        const orderedFoodsQuery = query(orderedFoodsCollection, where('order_id', '==', order_id));
        const orderedFoodsSnapshot = await getDocs(orderedFoodsQuery);
  
        if (orderedFoodsSnapshot.empty) {
          console.log(`No documents found with order_id: ${order_id} in ordered_foods subcollection of customer ${customerDoc.id}`);
          return;
        }
  
        const deleteOrderedFoodsPromises = orderedFoodsSnapshot.docs.map(async (orderedFoodDoc) => {
          const orderedFoodRef = orderedFoodDoc.ref;
          await deleteDoc(orderedFoodRef);
        });
  
        await Promise.all(deleteOrderedFoodsPromises);
      });
  
      await Promise.all(deleteCustomersPromises);
  
      console.log('Order and associated data deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSendToKitchen = async (order_id) => {
    await updateOrderStatus(order_id, 'Preparing');
  };

  const resetNewOrdersCount = () => {
    setNewOrdersCount(0);
  };

  return {
    orders,
    newOrdersCount,
    resetNewOrdersCount,
    handleConfirm,
    handleCancel,
    handleDelete,
    handleSendToKitchen
  };
}
