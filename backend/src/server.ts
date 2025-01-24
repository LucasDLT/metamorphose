import express from "express";
import authRoutes from "./routes/authRoutes"
import imageRoutes from "./routes/imageRoutes";

const server = express(); 

server.use(express.json())
server.use("/metamorphose",authRoutes)
server.use("/metamorphose/images", imageRoutes);


export default server;