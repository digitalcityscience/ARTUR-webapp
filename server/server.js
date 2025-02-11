import express from "express";
import apiRoutes from "./api.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Welcome to the ARTUR Geodata API");
});

app.use("/api", apiRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
