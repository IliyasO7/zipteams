import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Todo from './todo.js';

const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    username:{
        type: Sequelize.STRING,

    },
    email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
    },
});


export default User;