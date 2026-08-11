import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const url = typeof args[0] === 'string' ? args[0] : (args[0] instanceof Request ? args[0].url : '');
  
  if (url.includes('firebase') || url.includes('googleapis')) {
    console.log(`[Firebase Network Request] GET/POST ${url}`);
    try {
      const response = await originalFetch(...args);
      if (!response.ok) {
        const clone = response.clone();
        const text = await clone.text().catch(() => 'Failed to read response body');
        console.error(`[Firebase Network FAILED] Status: ${response.status} ${response.statusText}`);
        console.error(`[Firebase Network FAILED] URL: ${url}`);
        console.error(`[Firebase Network FAILED] Body: ${text}`);
      } else {
        console.log(`[Firebase Network SUCCESS] Status: ${response.status} URL: ${url}`);
      }
      return response;
    } catch (err: any) {
      console.error(`[Firebase Network EXCEPTION] URL: ${url}`);
      console.error(`[Firebase Network EXCEPTION] Error:`, err);
      throw err;
    }
  }
  return originalFetch(...args);
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Explicitly set persistence for mobile compatibility and reliability
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export { app, auth, db };
