import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"


function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth)
        alert('User signed out')
        navigate('/')
    }

    return (
        <>
            <button onClick={handleSignOut}> Sign Out </button>
        </>
    )
}

export default SignOut