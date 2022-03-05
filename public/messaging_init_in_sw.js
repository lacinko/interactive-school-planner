import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAVTMHCFlwLS4eNUsnBSdzpNyzHycKwVlE",
  authDomain: "bakalarsky-projekt-ab992.firebaseapp.com",
  projectId: "bakalarsky-projekt-ab992",
  storageBucket: "bakalarsky-projekt-ab992.appspot.com",
  messagingSenderId: "541166991908",
  appId: "1:541166991908:web:9a567006e7505f258b36b1",
  measurementId: "G-ENMSD7QRSE",
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
