import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed

const useFetchMessages = (customerID) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchChats = async () => {
      try {
        setLoading(true);

        if (customerID) {
          // Fetch chats for a specific customer
          const customerDocRef = doc(firestore, 'customers', customerID);
          const chatsCollectionRef = collection(customerDocRef, 'chats');
          const chatsQuery = query(chatsCollectionRef);

          // Set up a real-time listener for chat documents
          unsubscribe = onSnapshot(chatsQuery, async (chatsSnapshot) => {
            const chatPromises = chatsSnapshot.docs.map(async (chatDoc) => {
              const messagesCollectionRef = collection(chatDoc.ref, 'messages');
              const messagesQuery = query(messagesCollectionRef);

              return new Promise((resolve, reject) => {
                onSnapshot(messagesQuery, (messagesSnapshot) => {
                  const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  resolve({ chatId: chatDoc.id, messages });
                }, reject);
              });
            });

            const allChats = await Promise.all(chatPromises);
            setChats(allChats);
            setLoading(false);
          });
        } else {
          // Handle case where customerID is not provided
          setChats([]);
          setLoading(false);
        }
      } catch (e) {
        console.error('Error fetching chats:', e);
        setError(e);
        setLoading(false);
      }
    };

    fetchChats();

    // Cleanup listener on unmount
    return () => unsubscribe && unsubscribe();
  }, [customerID]);

  return { chats, loading, error };
};

const deleteChat = async (chatId) => {
  try {
    const chatDocRef = doc(firestore, 'chats', chatId);
    await deleteDoc(chatDocRef);
    console.log('Chat deleted successfully');
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};

export { useFetchMessages, deleteChat };
