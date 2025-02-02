import { Sequelize } from "sequelize-typescript";
import { join } from "path";
const sequelize = new Sequelize({
	dialect: "postgres",
	host: "localhost",
	port: 5431,
	username: "postgres",
	password: "root",
	database: "book_catalog",
	models: [join(__dirname, "models")],
	logging: false,
});

export default sequelize;
