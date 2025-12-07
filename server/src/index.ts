import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import fs from "fs";
import path from "path";

import postsRouter from "routes/posts"
import usersRouter from "routes/users"
import systemsRouter from "routes/systems"

dotenv.config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_API_KEY


const app = express();
const port = 5000;

app.use(express.json())

const allowedOrigins = ["http://localhost"];

// CORS
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The "Access-Control-Allow-Origin" header is present on the requested resource with values of ' + allowedOrigins.join(', ');
      return callback(new Error(msg), false);
    }
    callback(null, true);
  }
};
app.use(cors())
// ----

const logStream = fs.createWriteStream(path.join(__dirname, "../logs/access.log"), { flags: "a" });
app.use(morgan("combined", { stream: logStream })); //формат "tiny", "combined" или "dev"


app.use("/api", systemsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error("Конфигурация подключения клиента Supabase отсутствует")
    console.log('Supabase URL:', supabaseUrl ? 'Loaded ✅' : 'Missing ❌');
    console.log('Supabase Key:', supabaseKey ? 'Loaded ✅' : 'Missing ❌');
    process.exit(1)
  }

  return console.log(`Server is listening on ${port}`);
});

export default app