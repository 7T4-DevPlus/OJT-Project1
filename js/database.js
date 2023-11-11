import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {  getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDit1hRzRZVfvmWDO9GuuBzGHcYmS57Hc0",
    authDomain: "api-ojt07.firebaseapp.com",
    databaseURL: "https://api-ojt07-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "api-ojt07",
    storageBucket: "api-ojt07.appspot.com",
    messagingSenderId: "428194251021",
    appId: "1:428194251021:web:aacfcfbe5635dee7223044",
    measurementId: "G-WPMR05EV96"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db

// const userDB = collection(db, "users");
// const productDB = collection(db, "products");
// const cartDB = collection(db, "carts");
// const orderDB = collection(db, "orders");

// export default userDB;
// export default productDB;
// export default cartDB;
// export default orderDB;

// document: https://firebase.google.com/docs/firestore/query-data/queries?hl=en&%3Bauthuser=0&authuser=0