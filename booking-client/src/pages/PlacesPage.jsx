import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";

export default function PlacesPage(){

    const {action} = useParams();
    const [places, setPlaces] = useState([]);

    useEffect(()=>{
        axios.get("/places").then(({data})=>{
            setPlaces(data)
        })
    },[])

    return (
        <div>
            <AccountNav/>
            <div className="text-centre">
                
                <br/>
                <Link className="inline-flex gap-1 bg-primary text-white yy-2 px-6" to={'/account/places/new'}> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div>
                {places.length>0 && places.map(places=>(
                    <Link to={"/account/places/"+ places._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 bg-gray-200 p-2 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            {places.photos.length>0 && (
                                <img className="object-cover" src={"http://localhost:4000/uploads/"+places.photos[0]} alt=""/>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl ">{places.title}</h2>
                            <p className="text-xm mt-2">{places.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}