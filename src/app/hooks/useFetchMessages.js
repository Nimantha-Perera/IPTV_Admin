import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed

const useFetchMessages = (chatID = null) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchChats = async () => {
      try {
        setLoading(true);

        if (chatID) {
          // Fetch messages for a specific chatID
          const chatDocRef = doc(firestore, 'chats', chatID);
          const messagesCollectionRef = collection(chatDocRef, 'messages');

          // Set up a real-time listener for messages documents
          unsubscribe = onSnapshot(messagesCollectionRef, (messagesSnapshot) => {
            const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChats([{ chatId: chatID, messages }]);
            setLoading(false);
          });
        } else {
          // Fetch all chats
          const chatsCollectionRef = collection(firestore, 'chats');
          unsubscribe = onSnapshot(chatsCollectionRef, (chatsSnapshot) => {
            const chatPromises = chatsSnapshot.docs.map(async (chatDoc) => {
              const messagesCollectionRef = collection(chatDoc.ref, 'messages');

              return new Promise((resolve, reject) => {
                onSnapshot(messagesCollectionRef, (messagesSnapshot) => {
                  const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  resolve({ chatId: chatDoc.id, messages });
                }, reject);
              });
            });

            Promise.all(chatPromises).then((allChats) => {
              setChats(allChats);
              setLoading(false);
            });
          });
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
  }, [chatID]);

  return { chats, loading, error };
};

const deleteChat = async (chatID) => {
  try {
    const chatDocRef = doc(firestore, 'chats', chatID);
    await deleteDoc(chatDocRef);
    console.log('Chat deleted successfully');
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};

export { useFetchMessages, deleteChat };
