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
const _dirname = path.resolve() // for production

//db connection comes here...

await connectDB()

app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://resume-builder-86un.onrender.com"
  ],
  credentials: true
}))


//creating the routes


app.use('/api/users',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)
// for production ...
 app.use(express.static(path.join(_dirname,"/frontend/dist")))
    
    // ✅ Use regex instead of '*'
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(_dirname,"frontend", "dist","index.html"))})
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})