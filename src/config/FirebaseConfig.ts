import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD9Z4gowdu7Fg55vSREh_IXvszPOdthQ8w",
    authDomain: "pico-cloud.firebaseapp.com",
    projectId: "pico-cloud",
    storageBucket: "pico-cloud.appspot.com",
    messagingSenderId: "236875344377",
    appId: "1:236875344377:web:32c3c1af6efb5ff5c37528",
    measurementId: "G-VGH6ZRSSC7"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;