import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './configs/db.js';
import userRouter from './routes/user.route.js';
import resumeRouter from './routes/resume.route.js';
import aiRouter from './routes/ai.route.js';
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

await connectDB();

// ✅ cors first
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://resume-builder-86un.onrender.com"
  ],
  credentials: true
}))

// ✅ then body parsers with size limit
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})