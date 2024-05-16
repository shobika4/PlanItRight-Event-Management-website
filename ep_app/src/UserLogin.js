import React,{useState} from 'react'
import{useNavigate , Link} from 'react-router-dom';
import './UserLogin.css'

const UserLogin = () => {
  const navigate= useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const handleclick=async(event)=>{
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:5000/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      if(response.ok){
       
        navigate('/Events');

      }else{
        console.error('Invalid email or password');
      }
    }catch(error){
      console.log("Error logging in",error);
    }








    
  };
  const handleclickback=()=>{
    navigate('/');
  }


  return (
    <div className="login-container">
        <h2>Login to Register for Events</h2>

        <form onSubmit={handleclick}>
            <div className="form">
                <div className="contents">
                <label htmlFor="useremail">Useremail</label>
                <input type="email" id="useremail " placeholder="Enter your email" required
                value={email}
                onChange={(event)=>setEmail(event.target.value)} ></input>
                

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required 
                value={password}
                onChange={(event)=>setPassword(event.target.value)}></input>
                </div>
                <button type ="submit">Login</button>
                <button type="button" onClick={handleclickback}>Back</button>

                

            </div>

        </form>
        <Link to="/signup">New User? Signup</Link>
        
    </div>
  )
}

export default UserLogin