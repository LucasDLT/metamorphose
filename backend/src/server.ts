import express from "express";
import authRoutes from "./routes/authRoutes"
import imageRoutes from "./routes/imageRoutes";
import emailRoutes from "./routes/contactRoutes"

const server = express(); 

server.use(express.json())
server.use("/metamorphose",authRoutes)
server.use("/metamorphose/images", imageRoutes);
server.use("/metamorphose/email", emailRoutes)

export default server;