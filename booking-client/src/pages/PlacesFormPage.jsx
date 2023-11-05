import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, redirect, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";


export default function PlacesFormPage(){

    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        if(!id){
            return
        }
        axios.get("/user-places"+ id).then(res=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
        })
    },[id])

    function preInput(header,description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
    }

    async function savePlace(e){
        e.preventDefault();
        const placeData = {title,address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests}

        if(id){
            await axios.put("/places",{id,...placeData})
        }else {
            await axios.post("/places",placeData)
    
        }
        setRedirect(true)

    }

    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    if(redirect){
        return <Navigate to={"/account/places"}/>
    }

    return <div>
                <AccountNav/>
                <form onSubmit={savePlace}>
                    {preInput("Title", "Title for your place. should be short and catchy for advertisement")}
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="title, for exampole: My Sweet Homes" />
                    {preInput("Address", "Address to this place")}
                    <input type="text" value={address} onChange={e=>setAddress(e.target.value)}  placeholder="Address" />
                    {preInput("Photos", "more = better")}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    {preInput("Desciption", "description to the place")}
                    <textarea value={description} onChange={e=>setDescription(e.target.value)}  className="" type="text" placeholder="Address" ></textarea>
                    {preInput("Perks", "select all the perks")}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    {preInput("Extra info", "house rules, etc")}
                    <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}  className="" type="text" placeholder="Address" ></textarea>
                    {preInput("Check in&out", "add check in and out times, remember to have extra time for cleaning")}
                    <div className="grid gap-2 gird-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="m-2 -mb-1 ">Check in time</h3>
                            <input value={checkIn} onChange={e=>setCheckIn(e.target.value)}  type='text' placeholder="14:00"/>
                        </div>
                        <div>
                            <h3 className="m-2 -mb-1 ">Check out time</h3>
                            <input value={checkOut} onChange={e=>setCheckOut(e.target.value)}  type='text' placeholder="11:00"/>
                        </div>
                        <div>
                            <h3 className="m-2 -mb-1 ">Max number of guest</h3>
                            <input value={maxGuests} onChange={e=>setMaxGuests(e.target.value)}  type='text'/>
                        </div>
                        <div>
                            <h3 className="m-2 -mb-1 ">Price per night</h3>
                            <input value={price} onChange={e=>setPrice(e.target.value)}  type='text'/>
                        </div>
                    </div>
                    <button className="primary my-4" >Save</button>
                </form>
            </div>
}