import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATfe3-k1txLH6DUeijKtTSer4jV3ku_KM",
  authDomain: "computing-individual-project.firebaseapp.com",
  projectId: "computing-individual-project",
  storageBucket: "computing-individual-project.appspot.com",
  messagingSenderId: "571392993197",
  appId: "1:571392993197:web:77887f004c0f556b746324",
  measurementId: "G-LCMXKM6M9W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
