import { useCallback } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc,setDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp

const useSendAdminMessage = (chatId, adminUid) => {
  const sendAdminMessage = useCallback(async (message) => {
    console.log('Sending message:', message);
    console.log('Chat ID:', chatId);
    console.log('Admin UID:', adminUid);

    if (message.trim() !== '') {
      const messageData = {
        text: message,
        isUserMessage: false,
        isBotResponse: false,
        isAdminResponse: true,
        timestamp: serverTimestamp(), // Use Firestore server timestamp
        senderId: adminUid, // Use actual admin UID
      };
      const db = getFirestore();
      try {
        const messageCollection = collection(db, 'chats', chatId, 'messages');
        const newMessageDoc = await addDoc(messageCollection, messageData);
        console.log('Message added with ID:', newMessageDoc.id);
      } catch (err) {
        console.error('Error adding message:', err);
      }

      
    }
  }, [chatId, adminUid]);

  return sendAdminMessage;
};

export default useSendAdminMessage;
