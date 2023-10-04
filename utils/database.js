import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const myEnvPass = process.env.DB_PASSWORD;
const myEnvUser = process.env.DB_USERNAME;
const mypass =  myEnvPass ? myEnvPass.toString() : '';
const myUser =  myEnvUser ? myEnvUser.toString() : '';



const sequelize = new Sequelize(process.env.DB_NAME, myUser, mypass, {
  host: process.env.DB_HOST, 
  dialect: 'postgres',
});


sequelize
  .authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;