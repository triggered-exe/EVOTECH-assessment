import express from 'express';
import connectDB from './database/mongoose.js';
import dotenv from 'dotenv';
import surveysRouter from './routes/surveys.routes.js';
import adminRouter from './routes/admin.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const PORT = process.env.PORT || 8000;

dotenv.config();
connectDB();
const app = express();
console.log(process.env.FRONTEND_URL);

app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3002", "https://iridescent-khapse-0bddb9.netlify.app"],
    credentials: true
  }));
  

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use('/api/surveys', surveysRouter);
app.use('/api/admin', adminRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})