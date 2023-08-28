import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { error } from 'console';
import { auth, db } from '../../config/firebase';
import {addDoc,collection} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';
interface CreateFormData{
    title:string;
   description:string;
}
export const CreateForm=()=>{
    const [user] = useAuthState(auth);
    const navigate=useNavigate();
    const schema=yup.object().shape({
        title:yup.string().required("Enter title"),
        description:yup.string().required("Enter description")
    })

    const {register,handleSubmit,formState:{errors}}=useForm<CreateFormData>({
       resolver:yupResolver(schema),
    });

    const postsRef=collection(db,"posts");
    
    const onCreatePost=async(data:CreateFormData)=>{
        try{
            await addDoc(postsRef,{
                title:data.title,
                description: data.description,
                username:user?.displayName,
                userId:user?.uid
               })
               alert("Post successfully");
               const timer=setTimeout(()=>{
                navigate("/");
               },2000);
               return () => clearTimeout(timer);
               
              
        }
        catch(e){
            console.log("The error is ",e);
        }
     
    }
    return(
       <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder='Title...'  {...register("title")}/>
        <p style={{color:'white'}}>{errors.title?.message}</p>
        <textarea placeholder='Description' {...register("description")}/>
        <p style={{color:'white'}}>{errors.description?.message}</p>
        <input type='submit' className='submitForm'/>
       </form>
    )
}