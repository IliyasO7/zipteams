import express from 'express';
import dotenv from 'dotenv';
import sequelize from './utils/database.js';
import { sendResponse } from './utils/helper.js';
dotenv.config();



const app = express();



app.use((err, req, res, next) => {
    console.error(err);
    sendResponse(res, 500, 'Internal server error', null, err);
  });

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Service is listening on port ${process.env.PORT}`);
      });
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });