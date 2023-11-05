import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import { UserContext } from "../Contexts/UserContext"
import PlacesPage from "./PlacesPage"

export default function AccountPage(){

    const {user, ready,setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)

    let {subpage } = useParams();
    if(subpage === undefined){
        subpage = 'profile'
    }

    async function logout(){
        await axios.post("/logout")
        setRedirect("/")
        setUser(null)
    }

    if(!ready){
        return 'Loading....'
    }
    if(redirect){
        return <Navigate to={redirect}></Navigate>
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

    return <div>
        <AccountNav />
        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name}
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )}

        {subpage === 'places' && <PlacesPage/>}
    </div>
}