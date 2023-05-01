import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import routerApi from './routes/index.js';
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


routerApi(app);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
