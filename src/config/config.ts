import express, { Request, Response, NextFunction } from "express";
import { route_avaliacao } from "../routes";
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "8");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
  );

  next();
});

app.use("/", route_avaliacao);
export { app };
