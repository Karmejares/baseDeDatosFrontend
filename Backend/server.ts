import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { json } from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

import estudiantesRouter from "./routes/estudiantes";

app.use("/api/estudiantes", estudiantesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
