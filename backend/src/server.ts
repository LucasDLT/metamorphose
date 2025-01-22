import express from "express";
import router from "./routes/router";

const server = express(); 

server.use(router);


export default server;