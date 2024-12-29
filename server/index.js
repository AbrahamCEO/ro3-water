require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const socketIO = require('socket.io');
const aiService = require('./services/aiService');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}));
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.IO setup
const io = socketIO(server, {
  cors: {
    origin: process.env.BASE_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Chat history storage (in-memory for development)
const chatHistory = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Initialize chat history for new connections
  chatHistory.set(socket.id, []);

  socket.on('chat message', async (message) => {
    try {
      // Store user message
      const userMessage = { type: 'user', content: message };
      const history = chatHistory.get(socket.id);
      history.push(userMessage);

      // Get AI response
      const aiResponse = await aiService.processMessage(message);
      history.push(aiResponse);
      
      // Send response back to client
      socket.emit('bot response', aiResponse);
    } catch (error) {
      console.error('Socket error:', error);
      socket.emit('bot response', { 
        type: 'bot', 
        content: 'Sorry, I encountered an error processing your request. Please try again.' 
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Clean up chat history
    chatHistory.delete(socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
