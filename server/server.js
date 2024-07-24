import express from "express";
import apiRoutes from "./api.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Geo Points API");
});

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
