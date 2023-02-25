export default function PhotosUploader({addedPhotos,onChange}){

    const [photoLink, setPhotoLink] = useState('')

    async function addPhotoByLink(e){
        e.preventDefault()
        const {data:filename} =  await axios.post("/upload-by-link", {link:photoLink})
        onChange(prev=>{
            return [...prev, filename]
        })
        setPhotoLink("")
    }

    function uploadPhoto(e){
        const files = e.target.files;
        const data = new FormData();
        for(let i=0; i<files.length; i++){
            data.append("photos", files[i])
        }
        axios.post("/upload",data,{
            headers: {"Content-Type": "multipart/form-data"}
        }).then(res=>{
            const {data:filenames} = res;
            onChange(prev=>[...prev, ...filenames])
        })
    }

    return <>
        <div className="flex gap-2">
            <input value={photoLink} onChange={e=>setPhotoLink(e.target.value)}  type="text" placeholder="Add using a link ....." />
            <button onClick={addPhotoByLink}  className="bg-grey-200 grow px-4 rounded-2xl" >Add&nbsp; photo</button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length >0 && addedPhotos.map(link=>(
                <div className="h-32 flex" key={link}>
                    <img className="rounded-2xl w-full object-cover position" src={"http://localhost:4000/uploads"+link} alt="" />
                </div>   
            ))}
            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input onChange={uploadPhoto} multiple type="file" className="hidden" />
                Upload 
            </label>
        </div>
    </>
}