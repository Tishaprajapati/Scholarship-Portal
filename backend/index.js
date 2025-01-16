import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import scholarshipRoutes from './routes/scholarship.route.js';
import applicationRoutes from './routes/application.route.js';
import connectDB from './utils/db.js';
import chatbotRoute from './routes/chatbot.route.js';

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend origin
    credentials: true // Enable credentials
}));
// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/scholarship', scholarshipRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/chatbot',chatbotRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Scholarship Application Portal');
});

// Connect to the database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
