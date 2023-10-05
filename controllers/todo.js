import Todo from '../models/todo.js';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import User  from '../models/user.js';
import { sendResponse } from '../utils/helper.js';
dotenv.config();

export const createTodo = async (req, res,next) => {
    try{

        const foundTodo = await Todo.findOne({ userId: req.user.id,title:req.body.title  });
   
        if (foundTodo) {
          return sendResponse(res, 400, 'Todo already exists', null, );
        }
                  const data = new Todo({

                        userId:req.user.id,
                        title:req.body.title,
                        status:req.body.status,
                        description: req.body.description,
                        dueDate:req.body.dueDate

                    });
                await data.save().then((savedTodo)=>{
                      sendResponse(res, 200, 'success',savedTodo );
                        }).catch((err)=>{
                        sendResponse(res, 400, 'failed',err );
                })
      
    }catch(err){
        next(err)
    }
};

  
export const getTodos = async (req, res,next) => {
    try{

         const filter = {};
            if (req.query.title) {
                filter['title'] = req.query.title
            }
      
            if (req.query.status) {
                filter['status'] = req.query.status;
            }

            if (req.query.dueDate) {
                filter['dueDate'] = req.query.dueDate;
            }
      
            const data = await Todo.findAll(filter)
 
            return sendResponse(res, 200, 'success', data);
    }catch(err){
        next(err)
    }
  };

export const getTodoById = async (req, res) => {
    const data = await Todo.findByPk(req.params.id);
    if (!data) return sendResponse(res, 404, 'todo does not exist');
  
    sendResponse(res, 200, 'success', data);
  };
  
export const updateTodo = async (req, res) => {
    const data = await Todo.findByPk(req.params.id);
    if (!data) return sendResponse(res, 404, 'todo does not exist');
  
    Object.assign(data, req.body);
  
    if (req.body.title) {
      data.title = req.body.title;
    }

    if (req.body.description) {
        data.description = req.body.description;
      }
  
    if (req.body.status) {
      data.status=req.body.status;
    }
  
    await data.save();
    sendResponse(res, 200, 'success', data);
  };

export const deleteTodo = async (req, res) => {
    const data = await Todo.findByPk(req.params.id);
    if (!data) return sendResponse(res, 404, 'user does not exist');
  
    await data.destroy();
  
    sendResponse(res, 200, 'success');
  };


