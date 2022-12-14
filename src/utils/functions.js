//* ADD USER
import firebase from "./firebase";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState} from "react";
import Toastify from "./toastify";


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

//* READ INFO

export const useFetch = ()=> {

    const [isLoading,setIsLoading] = useState(true)
    const [contactList, setContactList] = useState()

    useEffect(() => {
    const db = getDatabase(firebase);
    const userRef = ref(db, "users/");

    onValue(userRef,(snapshot)=>{
        const data = snapshot.val();
        const userArray = []

        for (let id in data){
            userArray.push({id,...data[id]})
        }
        
        setContactList(userArray)
        setIsLoading(false)
    })
    },[])
    return {isLoading, contactList}
}

export const DeleteUser = (id)=> {
    const db = getDatabase(firebase);
   /*  const userRef = ref(db, "users/"); */
    remove(ref(db,"users/"+id))
    Toastify("Deleteed Succesfully")

}

export const UpdateUser = (info) => {
    const db = getDatabase(firebase);
    const userRef = ref(db, "users/");
    
    const updates = {};

    updates["users/" +info.id] = info 

    return update(ref(db), updates);
}