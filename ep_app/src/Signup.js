import React ,{useState}from 'react'

import{useNavigate , Link} from 'react-router-dom';
import './Signup.css';


const Signup = () => {
    const navigate=useNavigate();
    const [email, setEmail] =useState('');
    const[password,setPassword]=useState('');

    const handlesignup= async(event)=>{
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/register',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({email,password}),
            });
            if(response.ok){
                navigate('/Login');

            }else{
                console.log('Error Registering user:');
            }
        }
        catch(error){
            console.error('Error Registering user:',error);
        }
       
    };
    const handleback=()=>{
        navigate('/');
    }





  return (
    <div className="login-container">
        <h2>Signup to Login</h2>

        <form onSubmit={handlesignup}>
            <div className="form">
                <div className="contents">
                <label htmlFor="useremail">Useremail</label>
                <input type="email" id="useremail " placeholder="Enter your email" required 
                value={email}
                onChange={(event)=> setEmail(event.target.value)}></input>
                

                <label htmlFor="password"> Create Password</label>
                <input type="password" id="password" placeholder="Enter your password" required 
                value={password}
                onChange={(event)=>setPassword(event.target.value)}></input>
                </div>
                <button type ="submit">Signup</button>
                <button type="button" onClick={handleback}>Back</button>

                

            </div>


        </form>
        <Link to="/Login">Existing user? Login</Link>
    </div>
  )
}

export default Signup