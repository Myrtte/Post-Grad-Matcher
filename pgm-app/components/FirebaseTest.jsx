import { auth, db } from '../firebase';
import { useEffect } from 'react';

export default function FirebaseTest() {
  useEffect(() => {
    console.log('Firebase auth:', auth);
    console.log('Firebase db:', db);
    console.log('Firebase connection test successful!');
  }, []);

  return (
    <div>
      <h2>Firebase Connection Test</h2>
      <p>Check the browser console for Firebase connection status</p>
    </div>
  );
}