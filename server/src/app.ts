import cors from "cors";
import express, { Express } from "express";
import todoRoutes from "./routes";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(todoRoutes);

app.all("*", async (req, res) => {
  res.status(404).json({message: "Something went wrong!"});
});

export { app };
