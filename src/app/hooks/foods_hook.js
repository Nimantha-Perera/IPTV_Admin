import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc,setDoc } from 'firebase/firestore';

const useFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      const db = getFirestore();
      try {
        const foodCollection = collection(db, 'availble_foods');
        const foodSnapshot = await getDocs(foodCollection);
        const foodList = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoods(foodList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const generateNewId = async (db) => {
    const foodCollection = collection(db, 'availble_foods');
    const querySnapshot = await getDocs(foodCollection);
  
    const existingIds = querySnapshot.docs.map(doc => doc.data().id);
    let newId = '0001';
  
    for (let i = 1; i <= existingIds.length + 1; i++) {
      const potentialId = i.toString().padStart(4, '0');
      if (!existingIds.includes(potentialId)) {
        newId = potentialId;
        break;
      }
    }
  
    return newId;
  };
  
  const addFood = async (food) => {
    const db = getFirestore();
    try {
      const newId = await generateNewId(db); // Generate the new ID
      const newFood = {
        ...food,
        id: newId, // Use the generated ID as the primary key
      };
  
      const foodCollection = collection(db, 'availble_foods');
      const newFoodRef = doc(foodCollection, newId); // Set the document with the new ID
      await setDoc(newFoodRef, newFood); // Set the document with the new ID
      setFoods([...foods, newFood]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editFood = async (food) => {
    const db = getFirestore();
    try {
      const foodDoc = doc(db, 'availble_foods', food.id);
      await updateDoc(foodDoc, food);
      setFoods(foods.map(f => (f.id === food.id ? food : f)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFood = async (id) => {
    const db = getFirestore();
    try {
      const foodDoc = doc(db, 'availble_foods', id);
      await deleteDoc(foodDoc);
      setFoods(foods.filter(food => food.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { foods, loading, error, addFood, editFood, deleteFood };
};

export default useFoods;
