import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js'
import { sendResponse } from '../utils/helper.js';
dotenv.config();


export const checkAuth = () => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const secret = process.env.JWT_SECRET ?? "";
  
    if (!token)
      return sendResponse(res, 401, "Authorization is required", null, {err:'Token is required'});
  
    jwt.verify(token, secret, {}, async (err, payload) => {
      if (err) {
        const errMessage = "TokenExpiredError"
  
        sendResponse(res, 401, errMessage, null, {
          code:
            'INVALID_TOKEN',
        });
        return;
      }

      console.log('here in check auth');
      const user = await User.findOne({ _id: payload.id });
      if (!user) {
        return sendResponse(res, 404, "User not found");
      }
      req.user = user;
      next();
    });
  };