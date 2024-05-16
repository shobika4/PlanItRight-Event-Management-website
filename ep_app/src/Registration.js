// Registration.js

import React, { useState } from 'react';
import './Registration.css';
import {useNavigate} from 'react-router-dom';

const Registration = () => {

  const navigate=useNavigate();
  const handleregisterback=()=>{
    navigate('/Events');
  }
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    age: '',
    eventName: '',
    eventDate: ''
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Form submitted successfully");
        console.log('User details added successfully');
        // Reset form fields after successful submission
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          age: '',
          eventName: '',
          eventDate: ''
        });
      } else {
        console.error('Failed to add user details');
      }
    } catch (error) {
      console.error('Error adding user details:', error);
    }
  };

  return (
    <div className="registration-container">
      <h1>Fill the Form to Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            name="phoneNumber" 
            value={formData.phoneNumber}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="eventName">Event Name:</label>
          <input 
            type="text" 
            id="eventName" 
            name="eventName" 
            value={formData.eventName}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input 
            type="date" 
            id="eventDate" 
            name="eventDate" 
            value={formData.eventDate}
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit" className="submit-button">Submit</button>
        <button className='submit-button' onClick={handleregisterback}>Back</button>
      </form>
    </div>
  );
};

export default Registration;
