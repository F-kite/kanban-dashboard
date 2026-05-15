import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import fs from "fs";
import path from "path";

import postsRouter from "routes/posts"
import usersRouter from "routes/users"
import systemsRouter from "routes/systems"
import { logger } from "utils/logger"

dotenv.config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_API_KEY

logger.info("Server initialization started");

const app = express();
const port = 5000;

app.use(express.json())

app.use(cors())
// ----

const logStream = fs.createWriteStream(path.join(__dirname, "../logs/access.log"), { flags: "a" });
app.use(morgan("combined", { stream: logStream })); //формат "tiny", "combined" или "dev"


app.use("/api", systemsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)

app.listen(port, err => {
  if (err) {
    logger.error("Server failed to start", { error: err });
    return;
  }

  if (!supabaseUrl || !supabaseKey) {
    logger.error("Конфигурация подключения клиента Supabase отсутствует", {
      supabaseUrl: supabaseUrl ? 'Loaded' : 'Missing',
      supabaseKey: supabaseKey ? 'Loaded' : 'Missing'
    });
    process.exit(1)
  }

  logger.info(`Server is listening on port ${port}`, { port });
});

export default app