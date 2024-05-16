
import './App.css';

import Homepage from './Homepage';
import UserLogin from './UserLogin';
import Signup from './Signup';
import Eventspage from './Eventspage';
import Eventspost from './Eventspost';
import AddEvents from './AddEvents';
import AdminLogin from './AdminLogin';
import Page from './Page';
import Registration from './Registration';
import { BrowserRouter,Route,Routes } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
           <Routes>
            <Route path="/" element={<Homepage/>}/>   
            <Route path="/Events" element={<Eventspage/>}/>
            <Route path="/Login" element={<UserLogin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/Eventpost" element={<Eventspost/>}/>
            <Route path="/addevents" element={<AddEvents/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/page" element={<Page/>}/>
            <Route path="/registration" element ={<Registration/>}/>

           </Routes>


    </BrowserRouter>
  );
}

export default App;
