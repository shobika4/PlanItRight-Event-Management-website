const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());

// create mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL@2003',
    database: 'user_authentication'
});

// connection to mysql
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to Mysql');
});

// register end point
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email or password is empty
        if (!email || !password) {
            res.status(400).send('Email and password are required');
            return;
        }

        const user = { email, password };
        db.query('INSERT INTO users SET ?', user, (error, results) => {
            if (error) {
                console.error('Error registering user:', error);
                res.status(500).send('Error registering user');
                return;
            }
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// login end point
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error('Error logging in:', error);
                res.status(500).send('Error logging in');
                return;
            }
            if (results.length === 0) {
                res.status(400).send('Invalid email or password');
                return;
            }
            const user = results[0];
            
            // Compare plain text password
            if (password !== user.password) {
                res.status(400).send('Invalid email or password');
                return;
            }
            const token = jwt.sign({ id: user.id }, 'your_secret_key');
            res.header('auth-token', token).send(token);
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

// middleware
app.use(bodyParser.json());

// adding events
app.post('/events', (req, res) => {
    const eventData = req.body;

    db.query('INSERT INTO events SET ?', eventData, (err, result) => {
        if (err) {
            console.error('Error adding event', err);
            res.status(500).send('Error adding event');
            return;
        }
        console.log('Event added successfully');
        res.status(201).send('Event added successfully');
    });
});

// display events
app.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (error, results) => {
        if (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events');
            return;
        }
        res.status(200).json(results);
    });
});

//delete event
app.delete('/events/:id',async(req,res)=>{
    try{
        const eventId= req.params.id;

        db.query('DELETE FROM events WHERE id = ?', [eventId], (error,results)=>{
            if(error){
                console.log('Error deleting event',error);
                res.status(500).send('Error deleting event');
                return;
            }
            res.status(200).send('Event deleted successfully');
        });
    }
    catch(error){
        console.error('Error deleting event:',error);
        res.status(500).send('Errordeleting event');
    }
});

// add user details endpoint
app.post('/user_details', (req, res) => {
    const { name, email, phoneNumber, age, eventName, eventDate } = req.body;
    const userDetails = {
        name,
        email,
        phone_number: phoneNumber, // Assuming your table column name is 'phone_number'
        age,
        event_name: eventName, // Assuming your table column name is 'event_name'
        event_date: eventDate // Assuming your table column name is 'event_date'
    };

    db.query('INSERT INTO user_details SET ?', userDetails, (error, results) => {
        if (error) {
            console.error('Error adding user details:', error);
            res.status(500).send('Error adding user details');
            return;
        }
        console.log('User details added successfully');
        res.status(201).send('User details added successfully');
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));



