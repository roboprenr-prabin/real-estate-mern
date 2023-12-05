import React, { useState,useEffect } from 'react'
import {useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser,loading,error} = useSelector((state)=>state.user)
  const [file,setFile] = useState(undefined)
  const [filePer,setFilePer] = useState(0);
  const [fileUploadErr,SetFileUploadErr] = useState(false);
  // console.log(file)
  const [formData,setFormData] = useState({});
  const [updateSucess,setUpdateSucess] = useState(false);
  // console.log(formData)
  const dispatch = useDispatch()
  const navigate = useNavigate();

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
          SetFileUploadErr(false)
        }
      )
    // handleSubmit;
  }

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  };

  const handleSubmit = async(e)=>{
    // console.log("Its in handleSub,it",formData) 
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          "Content-Type":'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      } 
      setUpdateSucess(true)
      
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async() =>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE"
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()}  className='w-24 h-24 rounded-full self-center mt-2  cursor-pointer'
           src={formData.avatar || currentUser.avatar} alt="profile-img" />
        <p className='text-sm text-center'>
          {fileUploadErr? <span className='text-red-700'>Error image upload(Image must be less than 2mb)</span>:
          filePer > 0 && filePer <100 ? <span className='text-slate-700'>{`Uploading ${filePer}%`}</span>
          :filePer == 100? <span className='text-green-700'>Image Successfully Uploaded</span>: <span></span>
          }
        </p>
        <input type="text" placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}
          className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange}
          className='border p-3 rounded-lg'/>
        <input type="password" placeholder='password' id='password' onChange={handleChange}
          className='border p-3 rounded-lg'/>
        <button disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...':'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error}</p>
      {updateSucess? <p className='text-green-700 mt-5'>Successfully Updated</p>:""}
    </div>
  )
}
