import React, { useState,useEffect } from 'react'
import {useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state)=>state.user)
  const [file,setFile] = useState(undefined)
  const [filePer,setFilePer] = useState(0);
  const [fileUploadErr,SetFileUploadErr] = useState(false);
  // console.log(file)
  const [formData,setFormData] = useState({});
  // console.log(formData)

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred/
          snapshot.totalBytes)*100;
        // console.log("Upload is "+progress+"% done");
        setFilePer(Math.round(progress));
      },
      (error)=>{
        SetFileUploadErr(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=>setFormData({...formData,avatar:downloadURL})
        )
      }
    )
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()}  className='rounded-full self-center mt-2 w-30 h-30 cursor-pointer'
           src={formData.avatar || currentUser.avatar} alt="profile-img" />
        <p className='text-sm text-center'>
          {fileUploadErr? <span className='text-red-700'>Error image upload(Image must be less than 2mb)</span>:
          filePer > 0 && filePer <100 ? <span className='text-slate-700'>{`Uploading ${filePer}%`}</span>
          :filePer == 100? <span className='text-green-700'>Image Successfully Uploaded</span>: <span></span>
          }
        </p>
        <input type="text" placeholder='username' id='username'
          className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id='email'
          className='border p-3 rounded-lg'/>
        <input type="password" placeholder='password' id='password'
          className='border p-3 rounded-lg'/>
        <button 
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
