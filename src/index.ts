import express from "express";
import bodyParser from "body-parser";
import upload from './routes/images.route';
import dotenv from 'dotenv';


dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use('/images', upload);

const server = app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});

export default server;
