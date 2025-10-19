import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import fs from "fs";
import path from "path";

import tasksRouter from "./routes/tasks"

dotenv.config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_API_KEY


const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())

const logStream = fs.createWriteStream(path.join(__dirname, "../logs/access.log"), { flags: "a" });
app.use(morgan("combined", { stream: logStream })); //формат "tiny", "combined" или "dev"

app.use('/api', tasksRouter)

app.get('/ping', (req, res) => {
  res.send('Server is healthy');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  if (!supabaseUrl || !supabaseKey){
    console.error("Конфигурация подключения клиента Supabase отсутствует")
    console.log('Supabase URL:', supabaseUrl ? 'Loaded ✅' : 'Missing ❌');
    console.log('Supabase Key:', supabaseKey ? 'Loaded ✅' : 'Missing ❌');
    process.exit(1)
  }
  
  return console.log(`Server is listening on ${port}`);
});

export default app