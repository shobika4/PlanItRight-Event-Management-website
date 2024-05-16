import React from 'react'
import {useNavigate} from 'react-router-dom'
import './HomePage.css'

const Homepage = () => {
  const navigate= useNavigate();
  const handlefindevents=()=>{
    navigate('/page');

  }
  const handlecreateevent=()=>{
    navigate('/adminlogin');
  }
  const handlelogin=()=>{
    navigate('/Login');
  }
  const handlesignup=()=>{
    navigate('/signup');
  }
  





  return (
    <div>
        <header>
            <div className="logo">
                <h2>PlanItRight</h2>

            </div>
            <nav>
                
                    <button type="button" onClick={handlefindevents}>Find Events</button>
                    <button type="button" onClick={handlecreateevent}>Create Events</button>
                    <button type="button" onClick={handlelogin}>Login</button>
                    <button type="button" onClick={handlesignup}>Signup</button>
                
            </nav>
        </header>

        <body>
          <div className="bodycontainer">
          <div className="background-container">
      
            <div className="overlay-text">
                <h2>Plan and organize your events</h2>
                        
            </div>
          </div>
            
            <div className="left-content">
              <p>Welcome to our dynamic event management app, where events come to life and memories are made. Explore a diverse array of gatherings, from cultural festivals to professional seminars, and everything in between. Browse, register, and immerse yourself in experiences that spark joy and inspire connection. Join our community of event enthusiasts and be part of something extraordinary. Let's make every moment count, together</p>
               </div>
               

       </div>
        </body>
        
        <footer>
        <p>Contact numbers: 123-456-7890 | Email: info@planitright.com</p>
      </footer>
        
    
    </div>
  )
}

export default Homepage