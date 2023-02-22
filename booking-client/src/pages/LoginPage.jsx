import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);

    async function loginUser(e){
        e.preventDefault()
        try{
            const userInfo = await axios.post('/login', {email,password})
            setUser(userInfo.data)
            alert("Login Success")
            setRedirect(true )
        }catch(err){
            console.log(err)
            alert("Login failed. Please try again later", err)
        }
    }

    if(redirect){
        return <Navigate to='/' />
    }

    return <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={loginUser}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="your@email.com"/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder="password"/>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="underline text-black" to="/register">Register</Link>
                </div>
            </form>
        </div>
    </div>
}