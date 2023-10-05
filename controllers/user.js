import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import User  from '../models/user.js';
import { sendResponse } from '../utils/helper.js';
dotenv.config();

export const createUser = async (req, res,next) => {
    try{
          const data = await User.findOne({
              where: {
                email: req.body.email
              }
          });

        if (data) {
          return sendResponse(res, 400, 'user already exists', null, );
        }

    const hash = bcrypt.hash(req.body.password,10 , async(err,hash)=>{
        
        if(err){
          return sendResponse(res, 400, 'Something Went Wrong', null, );
          }else
            {
                  const user = new User({
                        username:req.body.username,
                        email:req.body.email,
                        password: hash 
                    });
                await user.save();
                sendResponse(res, 200, 'success', user);
            }
    });
        
    }catch(err){
        next(err)
    }
  };

  
export const getUsers = async (req, res,next) => {
    try{
         const filter = {};
            if (req.query.username) {
                filter['username'] = req.query.username
            }
      
            if (req.query.email) {
                filter['email'] = req.query.email;
            }
      
            const data = await User.findAll(filter)
 
            return sendResponse(res, 200, 'success', data);
    }catch(err){
        next(err)
    }
  };

export const getUserById = async (req, res) => {
    const data = await User.findByPk(req.params.id);
    if (!data) return sendResponse(res, 404, 'customer does not exist');
  
    sendResponse(res, 200, 'success', data);
  };
  
  export const updateUser = async (req, res) => {
    const data = await User.findByPk(req.params.id);
    if (!data) return sendResponse(res, 404, 'customer does not exist');
  
    Object.assign(data, req.body);
  
    if (req.body.email) {
      data.email = req.body.email;
    }
  
    if (req.body.username) {
      data.username =req.body.username;
    }
  
    await data.save();
    sendResponse(res, 200, 'success', data);
  };

export const deleteUser = async (req, res) => {
    const data = await User.findByPk(req.params.id);
    if (!data) return sendResponse(res, 404, 'user does not exist');
  
    await data.destroy();
  
    sendResponse(res, 200, 'success');
  };


export const login = async (req, res,next) => {
  try{
    console.log(req.body.email)

      const data = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!data) {
        return sendResponse(res, 400, 'user already exists', null, );
      }

      bcrypt.compare(req.body.password,data.password ,async (err)=>{
      
      if(err){  
          return sendResponse(res, 400, 'Invalid Password', null, );
        }else
          {
            const token = jwt.sign(data.id,process.env.JWT_SECRET)
              sendResponse(res, 200, 'success',{accessToken:token},null);
          }
  });
  
  }catch(err){
      next(err)
  }
};