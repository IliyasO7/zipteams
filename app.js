import express from 'express';
import dotenv from 'dotenv';
import sequelize from './utils/database.js';
import { sendResponse } from './utils/helper.js';
import routes from './routes/index.js';
import User from './models/user.js';
import Todo from './models/todo.js';

dotenv.config();

const app = express();


app.use(routes);

app.get('/', (req, res) => {
  sendResponse(res, 200, 'Server is working');
});

app.use((err, req, res, next) => {
    console.error(err);
    sendResponse(res, 500, 'internal server error', null, err);
  });

User.hasMany(Todo);  
Todo.belongsTo(User);

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Service is listening on port ${process.env.PORT}`);
      });
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });