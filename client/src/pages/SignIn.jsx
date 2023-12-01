import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice.js'

export default function SignIn() {
  const [formData,setFormData] = useState({});
  // const [error,setError] = useState(null);
  // const [loading,setLoaing] = useState(false);
  const {loading,error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // setLoaing(true);
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      // setError(data.message);
      // setLoaing(false);
      dispatch(signInFailure(data.message));
      return
    }
    // setLoaing(false);
    // setError(null);
    dispatch(signInSuccess(data.message))
    // console.log(data);
    navigate('/');
  }
  // console.log(formData);
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto'>
        <input type="email" placeholder='email'
        className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password'
        className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...':'Sign in'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
