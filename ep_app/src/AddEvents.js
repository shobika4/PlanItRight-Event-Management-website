import React from 'react';
import './AddEvents.css'
import {useNavigate} from 'react-router-dom';


const AddEvents = () => {
    const navigate= useNavigate();
    const handleeventsubmit=async(event)=>{
        event.preventDefault();
        const formData={
            event_name:event.target.event_name.value,
            event_description:event.target.event_description.value,
            event_date:event.target.event_date.value,
            event_time:event.target.event_time.value,
            capacity: event.target.capacity.value,
            place: event.target.place.value,
            category: event.target.category.value
        };

        if (formData.event_description.length > 100) {
            alert('Event description should be less than 100 characters.');
            return;
        }
    
        // Validate event date
        const currentDate = new Date();
        const selectedDate = new Date(formData.event_date);
        if (selectedDate <= currentDate) {
            alert('Please select a future date for the event.');
            return;
        }
        try{
            const response= await fetch('http://localhost:5000/events',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            if(response.ok){
                alert("Event details submitted");
                navigate('/Eventpost');

            } else{
                alert("Failed to submit event details");
            }
            
          
            
        }catch(error){
            console.error('Error submitting event details', error);
            alert('failed to submit event details');
        }
    




        
    };
    const handleeventback=()=>{
        navigate('/Eventpost');
    }


  return (


    <div className='login-container'>


        
        <form onSubmit={handleeventsubmit}>


            <h2>Add your Event Details</h2>
            <div className='form'>
                <label htmlFor="event_name">Event Name:</label>
                <input type="text" id="event_name" name="event_name"  required />
            </div>
            <div>
                <label htmlFor="event_description">Event Description:</label>
                <textarea id="event_description" name="event_description"  rows="3" maxLength="100"></textarea>
            </div>
            <div>
                <label htmlFor="event_date">Event Date:</label>
                <input type="date" id="event_date" name="event_date"  required />
            </div>
            <div>
                <label htmlFor="event_time">Event Time:</label>
                <input type="time" id="event_time" name="event_time"  required />
            </div>
            <div>
                <label htmlFor="capacity">Capacity:</label>
                <input type="number" id="capacity" name="capacity" min="1"  required />
            </div>
            <div>
                <label htmlFor="place">Place:</label>
                <input type="text" id="place" name="place"  required />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category"  required />
            </div>
            <button type="submit">Submit</button>
            <button className="back" onClick={handleeventback}>Back</button>
        </form>
           
        
    </div>
  )
}

export default AddEvents