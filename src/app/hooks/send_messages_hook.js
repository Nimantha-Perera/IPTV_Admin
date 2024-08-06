import { useCallback } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed

const useSendAdminMessage = (chatId, adminUid) => {
  const sendAdminMessage = useCallback(async (message) => {
    if (message.trim() === '') {
      console.error('Message cannot be empty');
      return;
    }

    const messageData = {
      text: message,
      isUserMessage: false,
      isBotResponse: false,
      isAdminResponse: true,
      timestamp: serverTimestamp(),
      senderId: adminUid,
    };

    try {
      // Reference to the messages subcollection within the specific chat under the specific customer
      const customerDocRef = doc(firestore, 'customers', 'customerID'); // Adjust 'customerID' as needed
      const chatsCollectionRef = collection(customerDocRef, 'chats');
      const newMessageDoc = await addDoc(collection(chatsCollectionRef, chatId, 'messages'), messageData);

      console.log('Message added with ID:', newMessageDoc.id);
    } catch (err) {
      console.error('Error adding message:', err);
    }
  }, [chatId, adminUid]);

  return sendAdminMessage;
};

export default useSendAdminMessage;
