require('dotenv').config();
const express = require('express');
const db = require('./db');
const user = require('./models/user');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const meRoutes = require('./routes/user');
const newChannelRoutes = require('./routes/createChannel');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//-- USER ROUTES / account creation, authentication, user info --//

// Signup
app.use('/api/users', signupRoutes);

// Login
app.use('/api/users/login', loginRoutes); 

// User info
app.use('/api/users/me', meRoutes); 

// Create channel
app.use('/api/channels', newChannelRoutes)


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


/* 


//-- CHANNEL ROUTES / create channel, get all channels, channel info --//


// GET ALL CHANNELS
app.get('/api/channels', (req, res) => {
  // Implement logic for retrieving information about all chat channels
});

// CHANNEL INFO
app.get('/api/channels/:id', (req, res) => {
  // Implement logic for retrieving information about a specific chat channel
});


//-- MESSAGE ROUTES / send message, get messages, edit message, delete message --//
app.post('/api/channels/:id/messages', (req, res) => {
  // Implement logic for sending a message in a chat channel
});

app.get('/api/channels/:id/messages', (req, res) => {
  // Implement logic for retrieving messages in a chat channel
});

app.put('/api/channels/:id/messages/:messageId', (req, res) => {
  // Implement logic for editing a message in a chat channel
});

app.delete('/api/channels/:id/messages/:messageId', (req, res) => {
  // Implement logic for deleting a message in a chat channel
});
*/