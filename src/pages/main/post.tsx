import { IPost } from './main'
import '../../App.css'
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
interface Props {
    post: IPost;
}
interface Like {
    like_id: string;
    user_id: string;
}

export const Post = (props: Props) => {

    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null)

    const likesRef = collection(db, "likes")

    const likesDoc = query(likesRef, where("post_id", "==", post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ user_id: doc.data().user_id, like_id: doc.id })));
    }
    const hasUserLiked = likes?.find((like) => like.user_id === user?.uid)

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                user_id: user?.uid,
                post_id: post.id
            })
            if (user) {
                setLikes(
                    (prev) => prev ? [...prev, { user_id: user?.uid, like_id: newDoc.id }] : [{ user_id: user?.uid, like_id: newDoc.id }]
                );
            }
        } catch (err) {
            console.log(err)
        }
    }
    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("post_id", "==", post.id),
                where("user_id", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.like_id !== likeToDeleteData.docs[0].id));
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getLikes();
    }, [])
    return (
        <div className='post'>
            <div className='title'><h1>{post.title}</h1></div>
            <div className='body'>
                <p>{post.description}</p>
            </div>
            <div >
                <p className='by_user'> @{post.username}</p>
                <div className='like_count'>
                    <button className='like-button' onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                    {likes ? <p>{likes?.length}</p> : ""}
                </div>
            </div>
        </div>
    );
}