import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alertcontext from './Context/AlertContext';
import Navbar from './Navbar';
import Alerts from './Alert';
import Loading from './Loading.js'
export default function Login() {
  const {Checkalert}=useContext(Alertcontext)
const [loading,setloading]=useState(false);

  //use Navigate hook to Navigate Home Page;
  const navigate=useNavigate()
// this Statte require to inuput data upadte
  const[user,setUser]=useState({email:"",password:""});
const Change=(e)=>{
  setUser({...user,[e.target.name]:e.target.value})
}
// this logic to Api Call on Backend And Got A reponce
  const hendlesubmit=async(e)=>{
    e.preventDefault();
    setloading(true)
    const responce= await fetch(`https://second-baay.onrender.com/api/auth/login`,{
      method:"POST",
      headers:{
        'Content-type':'Application/json'
      },
      body: JSON.stringify({email:user.email,password:user.password})
    })
    const json=await responce.json()
    console.log(json)
    setloading(false)
    if(json.success){
      localStorage.setItem('token',json.data)
      navigate('/')
     
      Checkalert(json.message,'Success')
    }
    else{
      
      Checkalert(json.message,"Faill")
    }
  }
  return (
    <>
    <Navbar/>
    <Alerts/>
    
    <form className='my-4 myform container'onSubmit={hendlesubmit}>
      <h2 className='text-center'>Login</h2>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control myinput" id="email" aria-describedby="emailHelp" name='email' value={user.email} onChange={Change} required/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label ">Password</label>
      <input type="password" className="form-control myinput" id="exampleInputPassword1" name='password'value={user.password}onChange={Change} required/>
    </div>
    
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
  {loading &&  <Loading/>}
  </>
  )
}
