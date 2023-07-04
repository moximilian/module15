import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {  yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { db } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'


interface CreateFormData {
    title:string;
    description:string;
}

export const CreateForm = ()=>{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title:yup.string().required("Title is required"),
        description:yup.string().required("Desciption is required").min(5).max(500),

    });
    const {register,handleSubmit,formState: {errors} } = useForm<CreateFormData>({
        resolver:yupResolver(schema)
    })
    const postsRef = collection(db, "posts") 

    const onCreatePost = async (data:CreateFormData) =>{
       await addDoc(postsRef,{
        // title:data.title,
        // description:data.description,
        ...data,
        username:user?.displayName,
        user_id:user?.uid
       })
       navigate('/')
    } 

    return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder='Title...' {...register("title")}/>
        {errors.title?.message ? <div className='error_message'>{errors.title?.message}</div> : ""}
        <textarea placeholder='Description...'{...register("description")} />
        {errors.description?.message ? <div className='error_message'>{errors.description?.message}</div> : ""}
        <input className='button' type="submit" value="Submit"/>
    </form>
    );
};