// hooks/useSendAdminMessage.js
import { useCallback } from 'react';
import { firestore } from '../firebase_connected/firebase'; // Adjust the path as needed



const useSendAdminMessage = (chatId, adminUid) => {
  const sendAdminMessage = useCallback(async (message) => {
    if (message.trim() !== '') {
      const messageData = {
        text: message,
        isUserMessage: false,
        isBotResponse: false,
        isAdminResponse: true,
        timestamp: firestore.FieldValue.serverTimestamp(), // Use Firestore server timestamp
        senderId: adminUid, // Use actual admin UID
      };

      try {
        await firestore.collection('chats')
          .doc(chatId)
          .collection('messages')
          .add(messageData);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }, [chatId, adminUid]);

  return sendAdminMessage;
};

export default useSendAdminMessage;
