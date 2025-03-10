import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes"
import imageRoutes from "./routes/imageRoutes"
import emailRoutes from "./routes/contactRoutes"
import categoryRoutes from "./routes/categoryRoutes"


const server = express(); 

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use("/metamorphose",authRoutes)
server.use("/metamorphose/images", imageRoutes);
server.use("/metamorphose/email", emailRoutes)
server.use("/metamorphose/categories", categoryRoutes)

export default server;