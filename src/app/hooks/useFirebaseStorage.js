import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useFirebaseStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `foods_imgs/${file.name}`);
    setUploading(true);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUploading(false);
      return url;
    } catch (err) {
      setError(err);
      setUploading(false);
      return null;
    }
  };

  return { uploadImage, uploading, error };
};

export default useFirebaseStorage;
