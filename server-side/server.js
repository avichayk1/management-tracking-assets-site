import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import cors from "cors";
dotenv.config();

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});