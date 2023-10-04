import User  from '../models/user.js';
import { sendResponse } from '../utils/helper.js';


export const createUser = async (req, res,next) => {
    try{
        const exist = await User.findOne({ email: req.body.email });
  
        if (exist) {
        return sendResponse(res, 400, 'user already exists', null, );
        }
    
        const user = new User({
            ...req.body,
        });
    
        await user.save();
    
        sendResponse(res, 200, 'success', user);
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
      
            const data = await User.find(filter)
 
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
  
    await data.deleteOne();
  
    sendResponse(res, 200, 'success');
  };