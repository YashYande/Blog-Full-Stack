import express,{ Express } from "express";
import dotenv from 'dotenv';
import { Request,Response } from "express";
import cors from 'cors'
import userRoutes from './routes/user.router'
import blogRoutes from './routes/blog.router'
import authRoutes from './routes/auth.router'
 dotenv.config()
 const app=express()
 app.use(express.json())

 app.post("/",(_req:Request,res:Response)=>{
    res.send("i am running")
    
 })
 app.use(cors({
    origin:'https://blog-full-stack-git-master-yash-yandes-projects.vercel.app' ,
    credentials:true,
}))
app.use('/',userRoutes);
app.use('/api',blogRoutes);
app.use("/api/auth",authRoutes);

const port=process.env.PORT || 4000
 app.listen(port,()=>{
    console.log(`Server running as port ${port}`);
 })
