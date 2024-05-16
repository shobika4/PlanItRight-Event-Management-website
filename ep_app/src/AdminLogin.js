import { useState } from 'react'
import React from 'react'
import './AdminLogin.css'
import {useNavigate} from 'react-router-dom';


const AdminLogin = () => {
    const navigate= useNavigate();
    const [username, setUsername]=useState('');
    const[password,setPassword]=useState('');


     const handleadminlogin=(e)=>{
        e.preventDefault();
        if(username==='admin' && password ==='pass'){
            navigate('/Eventpost');

        }
        else{
            alert("Invalid credentials");
        }
        
     }

     const handleadminback=()=>{
        navigate('/');
     }



  return (
    <div className="login-container">
    <h2>Admin Login to add or delete events</h2>

    <form onSubmit={handleadminlogin} >
        <div className="form">
            <div className="contents">
            <label htmlFor="useremail">Username</label>
            <input type="text" id="username " placeholder="Enter your name" required value={username} onChange={(e)=>setUsername(e.target.value)}
            ></input>
            

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required value={password} onChange={(e)=>setPassword(e.target.value)}
            ></input>
            </div>
            <button type ="submit">login</button>
            <button type="button" onClick={handleadminback}>Back</button>

            

        </div>


    </form>
</div>
  )
}

export default AdminLogin