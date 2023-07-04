import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import '../App.css';
import { useAuthState } from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const logOut = async () =>{
        await signOut(auth);
    };

    return (
        <div className='navbar'>
            <div className = 'links'>
            <Link to={"/"}>Home</Link>
            {!user ? <Link to={"/login"}>Login</Link> : <Link to={"/createpost"}>Create Post</Link>}
            
            </div>
            {user && (
            <>
            <div>
                <p>{user?.displayName}</p>
            </div>
            <img className = "profile_pic" alt = ""  src = {user?.photoURL || ""}/>
            <button className='button' onClick={logOut}>Log Out</button>
            </>)}
        </div>
    );
}