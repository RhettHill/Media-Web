import {db} from "@/FirebaseConfig"
import { ProfileResponse } from "@/types";
import { UserProfile } from "@/types";
import { addDoc, collection, doc, getDocs,  query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: UserProfile) =>{
    try{
        console.log("Data being passed to addDoc:", user)
        return addDoc(collection(db,COLLECTION_NAME),user);
    }catch(error){
        console.log(error)
    }
}

export const getUserProfile = async (userId: string) =>{
    try{
        const q = query(collection(db,COLLECTION_NAME),where("userId","==", userId))
        const  querySnapshot = await getDocs(q)
        let tempData: ProfileResponse = {}
        if(querySnapshot.size >0) {
            querySnapshot.forEach((doc) =>{
                const userData = doc.data() as UserProfile;
                 tempData = {
                    id: doc.id,
                    ...userData
                 }
            })
            console.log("Returned data : ", tempData)
            return tempData
        }else{
            console.log("No such Document")
            return tempData
        }
    }catch(error){
        console.log(error)
    }
};

export const updateUserProfile = async (id: string, user: UserProfile) =>{
    const docRef = doc(db,COLLECTION_NAME,id);
    return  ( updateDoc(docRef,{
        ...user,
    })
)}

export const getAllUsers = async(userid: string="") =>{
    try{
        const q = query(collection(db,COLLECTION_NAME),where("userId","!=", userid))
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size>0){
            const tempArr: UserProfile[] = []
            querySnapshot.forEach((doc) =>{
                const data = doc.data()
                const responseObj: UserProfile = {
                    ...data,
                }
                tempArr.push(responseObj)
        })
    
            return tempArr;
        }else{
            console.log("No such document");
        }
        
    }catch(error){
        console.log(error)
    }
}