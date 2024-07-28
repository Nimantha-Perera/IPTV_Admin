import { useEffect, useState } from 'react';
import { firestore } from '../firebase_connected/firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function useUsers() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'customers'));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCount(docs.length);
      setUsers(docs);
    };

    fetchData();
  }, []);

  const addCustomer = async (customer) => {
    try {
      await addDoc(collection(firestore, 'customers'), customer);
      const querySnapshot = await getDocs(collection(firestore, 'customers'));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCount(docs.length);
      setUsers(docs);
    } catch (error) {
      console.error('Error adding customer: ', error);
    }
  };

  const updateCustomer = async (customer) => {
    try {
      const customerRef = doc(firestore, 'customers', customer.id);
      await updateDoc(customerRef, customer);
      const querySnapshot = await getDocs(collection(firestore, 'customers'));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCount(docs.length);
      setUsers(docs);
    } catch (error) {
      console.error('Error updating customer: ', error);
    }
  };

  return { count, users, addCustomer, updateCustomer };
}
