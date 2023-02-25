import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/perks";
import PhotosUploader from "../components/PhotosUploader";

export default function PlacesPage(){

    const {action} = useParams();

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
    function preInput(header,description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
    }

    return (
        <div>
            {action !== 'new' && 
                <div className="text-centre">
                    <Link className="inline-flex gap-1 bg-primary text-white yy-2 px-6" to={'/account/places/new'}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            }
            {action === 'new' && (
                <div>
                    <form>
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
                        <div className="grid gap-2 sm:gird-cols-3">
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
                        </div>
                        <button className="primary my-4" >Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}