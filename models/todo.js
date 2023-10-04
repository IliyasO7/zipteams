import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Todo = sequelize.define('todos',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    title: {
        type: Sequelize.STRING,
        allowNull: false
      },
    description: {
        type: Sequelize.TEXT
      },
    dueDate: {
        type: Sequelize.DATE
      },
    status: {
        type: Sequelize.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'pending'
      },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
});



export default Todo;