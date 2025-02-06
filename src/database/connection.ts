import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.DB_PORT);

const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST || "",
	port: port,
	username: process.env.DB_USERNAME || "",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_DATABASE || "",
	models: [join(__dirname, "models")],
	logging: false,
});

export default sequelize;
