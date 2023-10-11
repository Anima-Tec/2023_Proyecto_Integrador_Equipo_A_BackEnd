
import Express from 'express';
import "dotenv/config";
import router from "./src/routes/routes.js"
import cors from 'cors';
import enviromentController from './src/config/enviromentController.js';

enviromentController.validatePort();
enviromentController.validateDatabaseUrl();
enviromentController.validateSecretKey();

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
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


const port = process.env.PORT;

app.listen( port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
