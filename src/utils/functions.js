//* ADD USER
import firebase from "./firebase";
import { getDatabase, push, ref, set } from "firebase/database";

export const AddUser = (info) => {
  const db = getDatabase(firebase);
  const userRef = ref(db, "users/");
  const newUserRef = push(userRef);

  console.log("Veriler eklendi");
  set(newUserRef, {
    username: info.username,
    phoneNumber: info.phoneNumber,
    gender: info.gender,
  });
};