import {Request, Response} from 'express';
import bcrypt from 'bcryptjs'
import {mockAdmin} from '../data/mockAdmin';

export const login = (req: Request, res: Response)=>{
    const {email, password} = req.body;

    if(email !==mockAdmin.email){
        return res.status(401).json({message:"correo electronico incorrecto"})
    }
}