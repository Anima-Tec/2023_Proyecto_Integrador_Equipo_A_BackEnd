import {express} from'express';
import {morgan} from'morgan';
import {cors} from('cors');
import {reportRoutes} from'./routes/reportRoutes';
import {userRoutes} from'./routes/userRoutes';
import {userSupervisorRoutes} from'./routes/userSupervisorRoutes'; 
import {userTecnicoRoutes} from'./routes/userTecnicoRoutes';
import { checkPortEnv } from './src/envChecker';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
checkPortEnv();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/reports', reportRoutes);
app.use('/users', userRoutes);
app.use('/technicians', userTecnicoRoutes);
app.use('/supervisors', userSupervisorRoutes); 

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
