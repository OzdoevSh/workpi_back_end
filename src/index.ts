import dotenv from 'dotenv';
import express from 'express';
import sequelize = require('../db');
import cors = require('cors');
import router = require('./routes/index');
import errorHandler from './middleware/ErrorHandlerMiddleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start:Promise<void> = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start()

