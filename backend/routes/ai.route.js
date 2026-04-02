import express from 'express'
import protect from '../middlewares/auth.middleware.js'
import { enhanceJobDescriptionSummary, enhanceProfessionalSummary, uploadResume,getATSScore } from '../controllers/ai.controller.js'


const aiRouter = express.Router()


aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc',protect,enhanceJobDescriptionSummary)
aiRouter.post('/upload-resume',protect,uploadResume)
aiRouter.post("/ats-score", protect, getATSScore);


export default aiRouter;