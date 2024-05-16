import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './Eventspage.css';

const Eventspage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm , setSearchTerm]=useState('');
  const[filter, setFilter] = useState('event_name');
  const navigate= useNavigate();
  const handleclickregister=()=>{
    navigate('/registration');
  }
  const handlepageback=()=>{
    navigate('/Login')
  }

  useEffect(()=>{
    const fetchEvents = async () =>{
      try{
        const response = await fetch('http://localhost:5000/events');
        if(response.ok){
          const eventData = await response.json();
          setEvents(eventData);
        }
        else{
          console.error('Failed to fetch events data');
        }
      }
      catch(error){
        console.error('Error fetching events data:', error);
      }
    };
    fetchEvents();
  },[]);

  const filteredEvents = events.filter((event)=>
    event[filter].toLowerCase().includes(searchTerm.toLowerCase())
  );







  return (
    <div className="events-container">
      <h2>Events</h2>
      <div classNmae="back-button">
        
        <button onClick={handlepageback}>Back</button>
        </div>
        <div className='search-bar'>
          <input type="text"
          placeholder="Search events .."
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}/>

          <select onChange={(e)=> setFilter(e.target.value)}>
            <opion value="event_name">Event Name</opion>
            <option value="event_date">Event Date</option>
            <option value="event_time">Event Time</option>
            <option value="category">event category</option>
            <option value="place">Place</option>
          </select>
        </div>

      
      <div>
        {
          filteredEvents.map((event)=>(
            <div key={event.id} className="event-card">
              <h3>{event.event_name}</h3>
              <p>{event.event_description}</p>
              <p className="event-date">Date:{event.event_date}</p>
              <p className="event-time">Time:{event.event_time}</p>
              <p>Capacity:{event.capacity}</p>
              <p>Place:{event.place}</p>
              <p className="event-category">Category:{event.category}</p>
              <button onClick={(handleclickregister)}>Register Now</button>






            </div>
          ))
        }
      </div>
      
      
    </div>
  );
};

export default Eventspage