import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed

const useFetchMessages = (chatId) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchChats = async () => {
      try {
        setLoading(true);

        // If chatId is provided, set up a real-time listener for that specific chat
        if (chatId) {
          const chatDocRef = collection(firestore, 'chats', chatId, 'messages');
          const q = query(chatDocRef);

          unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChats([{ chatId, messages }]);
            setLoading(false);
          });
        } else {
          // Fetch all chat documents with real-time updates
          const chatsCollection = collection(firestore, 'chats');

          unsubscribe = onSnapshot(chatsCollection, async (chatsSnapshot) => {
            const chatPromises = chatsSnapshot.docs.map(async (chatDoc) => {
              const messagesCollection = collection(chatDoc.ref, 'messages');
              const messagesQuery = query(messagesCollection);

              return new Promise((resolve, reject) => {
                onSnapshot(messagesQuery, (messagesSnapshot) => {
                  const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  resolve({ chatId: chatDoc.id, participants: chatDoc.data().participants, messages });
                }, reject);
              });
            });

            const allChats = await Promise.all(chatPromises);
            setChats(allChats);
            setLoading(false);
          });
        }

      } catch (error) {
        console.error('Error fetching chats:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchChats();

    // Cleanup listener on unmount
    return () => unsubscribe && unsubscribe();
  }, [chatId]);

  return { chats, loading, error };
};

export default useFetchMessages;
