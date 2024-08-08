import { useCallback } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed

const useSendAdminMessage = (defaultChatId, adminUid) => {
  const sendAdminMessage = useCallback(async (message, chatId = defaultChatId) => {
    if (!chatId) {
      console.error('Chat ID is required');
      return;
    }

    if (!adminUid) {
      console.error('Admin UID is required');
      return;
    }

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
      // Assuming customerId is available in the context or passed to this hook
      const customerId = 'someCustomerId'; // Replace with actual logic to get customerId

      // Path to messages collection
      const messagesCollectionRef = collection(firestore, 'customers',defaultChatId, 'chats', chatId, 'messages');
      const newMessageDoc = await addDoc(messagesCollectionRef, messageData);

      console.log('Message added with ID:', newMessageDoc.id);
    } catch (err) {
      console.error('Error adding message:', err);
    }
  }, [defaultChatId, adminUid]);

  return sendAdminMessage;
};

export default useSendAdminMessage;
