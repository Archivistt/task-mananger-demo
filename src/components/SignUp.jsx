import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Link } from "react-router-dom"
import { useState } from "react"


function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert('User created successfully')
            setEmail('')
            setPassword('')
        } catch (error) {
            setError(error)
        }
    }

    return (
        <>
            <h3>Sign Up</h3>
            <input type="email" required placeholder="user@email.com" onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" required placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={handleSignUp}> Sign Up </button>
            {error && <p>{error}</p>}
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </>
    )
}

export default SignUp