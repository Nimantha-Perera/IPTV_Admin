import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, deleteDoc, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../firebase_connected/firebase'; // Adjust the path as needed

const useFetchMessages = (customerId = null) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchChats = async () => {
      try {
        setLoading(true);

        if (customerId) {
          // Fetch messages for a specific customer and chatId with real-time updates
          const messagesCollectionRef = collection(firestore, 'customers', customerId, 'chats', customerId, 'messages');
          const messagesQuery = query(messagesCollectionRef, orderBy('timestamp'));

          unsubscribe = onSnapshot(messagesQuery, (messagesSnapshot) => {
            const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChats([{ chatId: customerId, messages }]);
            setLoading(false);
          }, (error) => {
            console.error('Error fetching messages:', error);
            setError(error);
            setLoading(false);
          });
        } else {
          // Fetch all chats for a specific customer and their messages with real-time updates
          const chatsCollectionRef = collection(firestore, 'customers', customerId, 'chats');

          unsubscribe = onSnapshot(chatsCollectionRef, async (chatsSnapshot) => {
            const chatPromises = chatsSnapshot.docs.map(async (chatDoc) => {
              const messagesCollectionRef = collection(chatDoc.ref, 'messages');
              const messagesQuery = query(messagesCollectionRef, orderBy('timestamp'));

              return new Promise((resolve, reject) => {
                onSnapshot(messagesQuery, (messagesSnapshot) => {
                  const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  resolve({ chatId: chatDoc.id, messages });
                }, reject);
              });
            });

            try {
              const allChats = await Promise.all(chatPromises);
              setChats(allChats);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching chats:', error);
              setError(error);
              setLoading(false);
            }
          }, (error) => {
            console.error('Error fetching chats:', error);
            setError(error);
            setLoading(false);
          });
        }
      } catch (e) {
        console.error('Error fetching chats:', e);
        setError(e);
        setLoading(false);
      }
    };

    fetchChats();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [customerId]);

  return { chats, loading, error };
};

const deleteChat = async (customerId) => {
  try {
    // Delete a specific chat document
    const chatDocRef = doc(firestore, `customers/${customerId}/chats/${customerId}`);
    await deleteDoc(chatDocRef);
    console.log('Chat deleted successfully');
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};

export { useFetchMessages, deleteChat };
