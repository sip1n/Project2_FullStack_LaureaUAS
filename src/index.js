require('dotenv').config();
const express = require('express');

const db = require('./db');
const user = require('./models/userModel');

const userRoutes = require('./routes/user');
const channelRoutes = require('./routes/channel');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// User route
app.use('/api/users', userRoutes);

// Channel route
app.use('/api/channels', channelRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


/* 


//-- CHANNEL ROUTES / create channel, get all channels, channel info --//


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