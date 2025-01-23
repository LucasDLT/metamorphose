import express from "express";
import authRoutes from "./routes/authRoutes"

const server = express(); 

server.use(express.json())
server.use("/metamorphose",authRoutes)


export default server;