import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import './Eventspost.css';


const Eventspost = () => {

  const navigate=useNavigate();
  const [searchTerm , setSearchTerm]=useState('');
  const[filter, setFilter] = useState('event_name');
  const handleadd=()=>{
    navigate('/addevents');
  }
  const handlepostback=()=>{
    navigate('/AdminLogin');
  }

  const handleDelete= async(eventId)=>{
    try{
      const response = await fetch(`http://localhost:5000/events/${eventId}`,{
        method : 'DELETE',
      });
      if(response.ok){
        setEvents((prevEvents)=>prevEvents.filter((event)=>event.id!== eventId));
      }
      else{
        console.error('Failed to delete event');
      }
    }catch(error){
      console.error('Error deleting event',error);
    }
  };
  const [events, setEvents] = useState([]);

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

<h1>Eventpost</h1>
<h3>To add events kindly click the below add button</h3>

<button onClick={handleadd}>Add</button>
<button onClick={handlepostback}>Back</button>
    <h2>Events</h2>

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
            <button onClick={()=>handleDelete(event.id)}>Delete</button>





          </div>
        ))
      }
    </div>
    
    
  </div>
)
}






export default Eventspost