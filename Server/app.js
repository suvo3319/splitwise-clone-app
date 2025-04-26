import express from "express";
import hostRouter from "./routes/hostRoutes.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded()); // Middleware to parse URL-encoded request bodies
app.use('/host', hostRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
