importScripts("/__/firebase/9.2.0/firebase-app-compat.js");
importScripts("/__/firebase/9.2.0/firebase-messaging-compat.js");
importScripts("/__/firebase/init.js");

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  //self.registration.showNotification(notificationTitle, notificationOptions);
});
