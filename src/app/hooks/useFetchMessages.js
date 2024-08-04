import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed

const useFetchMessages = (chatId) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);

        // If chatId is provided, fetch messages for that specific chat
        if (chatId) {
          const chatDocRef = collection(firestore, 'chats', chatId, 'messages');
          const messagesSnapshot = await getDocs(chatDocRef);
          const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setChats([{ chatId, messages }]);
        } else {
          // Fetch all chat documents
          const chatsCollection = collection(firestore, 'chats');
          const chatsSnapshot = await getDocs(chatsCollection);
          const chatPromises = chatsSnapshot.docs.map(async (chatDoc) => {
            // Fetch messages for each chat
            const messagesCollection = collection(chatDoc.ref, 'messages');
            const messagesSnapshot = await getDocs(messagesCollection);
            const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            return { chatId: chatDoc.id, participants: chatDoc.data().participants, messages };
          });

          const allChats = await Promise.all(chatPromises);
          setChats(allChats);
        }

        setLoading(false);

      } catch (error) {
        console.error('Error fetching chats:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchChats();
  }, [chatId]);

  return { chats, loading, error };
};

export default useFetchMessages;
