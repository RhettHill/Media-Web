import {db} from "@/FirebaseConfig"
import { documentResponse, Post, ProfileInfo, Comment } from "@/types";
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post) =>{
    return addDoc(collection(db,COLLECTION_NAME),post)
};

export const getPosts = async() => {
    try{
    const q = query(collection(db,COLLECTION_NAME),orderBy("date","desc"))
    const querySnapshot = await getDocs(q);
    const tempArr: documentResponse[] = [];
    if(querySnapshot.size>0){
        querySnapshot.forEach((doc) =>{
            const data = doc.data()
            const responseObj: documentResponse = {
                id: doc.id,
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
};

export const getPostByUserId = (id: string) =>{
    const q = query(collection(db,COLLECTION_NAME),where("userId","==", id))
    return getDocs(q);
};

export const getPost = (id: string) =>{
    const docRef = doc(db,COLLECTION_NAME,id)
    return getDoc(docRef)
}

export const deletePost = (id: string) => {
    return deleteDoc(doc(db,COLLECTION_NAME,id));
}

export const updateLikesOnPost =(id:string, userlikes:string[],likes:number)  => {
    const docRef = doc(db,COLLECTION_NAME, id)
    return updateDoc(docRef, {
        likes: likes,
        userlikes: userlikes,
    });
}

export const updateUserInfoOnPost = async(profileInfo: ProfileInfo) => {
    const q = query(collection(db,COLLECTION_NAME),where("userId","==", profileInfo.user?.uid))
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size > 0) {
        querySnapshot.forEach((document) => {
            const docRef = doc(db,COLLECTION_NAME,document.id)
            updateDoc(docRef,{
                username: profileInfo.displayName,
                photoURL: profileInfo.photoURL
            });
        })
    }else{
        console.log("The user doesn't have any posts")
    }
}

export const updateComments = async(Id: string, newComment: Comment) =>{
    const docRef = doc(db,COLLECTION_NAME,Id);
     updateDoc(docRef, {
        comments: arrayUnion({
            content: newComment.content,
            author: newComment.author,})
    })
}