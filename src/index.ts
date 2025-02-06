import express, { Express, Response, Request } from "express";
import router from "./routes";
import sequelize from "./database/connection";
import CORS from "cors";

const app: Express = express();
const port = 4000;
sequelize
	.sync({ force: false })
	.then(() => console.log("Database CONNECTED"))
	.catch((err) => console.log(err));

app.use(CORS());
app.use(express.json());
app.use("/ts", router);
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "app on point" });
});
app.listen(port, () => {
	console.log(`App running perfectly on port ${port} `);
});
