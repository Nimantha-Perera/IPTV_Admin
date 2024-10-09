import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, deleteDoc, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../firebase_connected/firebase'; // Adjust the path as needed

const useFetchMessages = (customerId = null) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;
    let lastFetch = Date.now();

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
            
            // Notify user about new messages
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.timestamp > lastFetch) {
              lastFetch = lastMessage.timestamp;
              if (Notification.permission === "granted") {
                new Notification("New Message", { body: lastMessage.text });
              }
            }
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
                  
                  // Notify user about new messages
                  const lastMessage = messages[messages.length - 1];
                  if (lastMessage && lastMessage.timestamp > lastFetch) {
                    lastFetch = lastMessage.timestamp;
                    if (Notification.permission === "granted") {
                      new Notification("New Message", { body: lastMessage.text });
                    }
                  }
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

    // Request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    fetchChats();

    // Poll for new messages every 30 seconds
    const intervalId = setInterval(() => {
      fetchChats();
    }, 30000);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      clearInterval(intervalId);
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
