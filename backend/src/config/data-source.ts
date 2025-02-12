import { DataSource } from "typeorm";
import { Image } from "../models/image";
import { User } from "../models/user";
import { Mail } from "../models/mail";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "35155",
    database: "metamorphose",
    synchronize: true,
    logging: true,
    entities: [Image, User, Mail],
    migrations: [],
    subscribers: [],
})  

export const UserModel = AppDataSource.getRepository(User);
export const ImageModel = AppDataSource.getRepository(Image);
export const MailModel = AppDataSource.getRepository(Mail);