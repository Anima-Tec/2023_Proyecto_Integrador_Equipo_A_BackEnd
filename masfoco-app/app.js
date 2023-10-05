import Express from 'express';
import router from "./src/routes/routes.js"
import cors from 'cors';
import dotenv from 'dotenv';
import { checkPortEnv } from './src/config/Enviroment-controller.js';
dotenv.config();
const port = process.env.PORT; 

const app = Express();
checkPortEnv();


app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
// app.use(morgan  ('dev'));
app.use(cors());

 app.use("/", router);


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});


app.listen( port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
