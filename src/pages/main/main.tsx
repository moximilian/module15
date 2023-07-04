import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './post';

export interface IPost{
    id:string;
    user_id:string;
    title:string;
    username:string;
    description:string;
}

export const Main = () => {
    const [postsList, setPostLists] = useState<IPost[] | null>( null);
    const postsRef = collection(db, "posts");
    const getPosts = async () =>{
        const data = await getDocs (postsRef)
        setPostLists(data.docs.map((doc) => ({...doc.data(),id: doc.id})) as IPost[]);
    }
    
    useEffect(()=>{
        getPosts();
    },[]);
    return <div className='posts_container'>{postsList?.map((post)=> (<Post post={post}/>) )}</div>;
}