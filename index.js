import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

// Initialize dotenv to read .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

const port = parseInt(process.env.PORT, 10) || 3000; // Fallback to port 3000 if PORT is not set

if (isNaN(port) || port <= 0) {
    console.error("Invalid port number. Please check your .env file.");
    process.exit(1);
}

const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.log("Error:", error));

// Routes
app.use('/book', bookRoute);
app.use('/user', userRoute);

// Base route
app.get('/', async (req, res) => {
  res.send("Welcome to bookstore backend");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
.on('error', (err) => {
  if (err.code === 'EACCES') {
    console.error(`Port ${port} requires elevated privileges`);
  } else if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
