const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const userSupervisorRoutes = require('./routes/userSupervisorRoutes'); 
const userTecnicoRoutes = require('./routes/userTecnicoRoutes');

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
