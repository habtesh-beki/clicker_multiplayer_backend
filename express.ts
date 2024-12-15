import express, { Express, json, Response } from "express";

const app: Express = express();

app.use(json());

app.get("/", (res: Response) => {
  res.send("Hello");
  return;
});

export { app };
