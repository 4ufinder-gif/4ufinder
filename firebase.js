<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

apiKey: "AIzaSyC3CYovbEyBygGf4MzYFjF0Cekl0gPYYx0",
  authDomain: "ufinder-2c8d7.firebaseapp.com",
  projectId: "ufinder-2c8d7",
  storageBucket: "ufinder-2c8d7.firebasestorage.app",
  messagingSenderId: "985733321518",
  appId: "1:985733321518:web:655ab1ed233024ef9ca0bf",
  measurementId: "G-JJL4EC2EXG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Helpers
export async function login(email, password){
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function register(email, password){
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logout(){
  return await signOut(auth);
}

// Firestore Helpers
export const productsCol = collection(db, "products");
export const ordersCol = collection(db, "orders");

export async function addProduct(data){
  return await addDoc(productsCol, {...data, timestamp: Timestamp.now()});
}

export async function getProducts(){
  return await getDocs(productsCol);
}

export async function deleteProduct(id){
  return await deleteDoc(doc(db, "products", id));
}

export async function updateProduct(id, data){
  return await updateDoc(doc(db, "products", id), data);
}

export async function addOrder(data){
  return await addDoc(ordersCol, {...data, timestamp: Timestamp.now()});
}

export async function getOrders(){
  return await getDocs(ordersCol);
}

// Check Auth State
export function onAuthChange(callback){
  onAuthStateChanged(auth, callback);
}
</script>
