import {auth,provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
export const Login =()=>{
    const navigate=useNavigate();

    const signwithGoogle=async()=>{
      const result= await   signInWithPopup(auth,provider); // this function will take 2 argument, auth and provider and return a promise, 
     // console.log("the result it",result);
     navigate("/");
    }
    return(
        <div>
           <p>Sign with Google to Continue</p>
           <button onClick={signwithGoogle}>Sign with Google</button>
        </div>
    )
}