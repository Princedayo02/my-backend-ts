import express, { Express, Response, Request } from "express";
import router from "./routes";

const app: Express = express();
const port = 4000;

app.use(express.json());
app.use("/ts", router);
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "app on point" });
});
app.listen(port, () => {
	console.log(`App running perfectly on port ${port} `);
});
