import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sequelize from './utils/database.js';
import  { sendResponse } from './utils/helper.js'
import routes from './routes/index.js';
import User from './models/user.js';
import Todo from './models/todo.js';

dotenv.config();

const app = express();
app.use(cors());
app.options('/*', (_, res) => {
  res.sendStatus(200);
});

app.use(express.json())

app.get('/server', (req, res) => {
  console.log('server started.....') 
  sendResponse(res, 200, 'Server is working');
});

app.use(routes);


app.use((err, req, res, next) => {
    console.error(err);
    sendResponse(res, 500, 'internal server error', null, err);
  });

User.hasMany(Todo);  
Todo.belongsTo(User);

// Reset the database by sequelize.sync({force:true})
sequelize.sync()  
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Service is listening on port ${process.env.PORT}`);
      });
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });