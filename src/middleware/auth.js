//import jwt from "jsonwebtoken";
//import { object } from "joi";
import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";

export const roles = {
    Admin : "Admin",
    User: "User",
    HR : "HR"
}
export const auth = (accessRoles = [])  =>{
    return asyncHandler (

        async (req, res, next) => {
            const { authorization } = req.headers;
            if (!authorization?.startsWith(process.env.BEARER_KEY)) {
               // return res.json({ message: "In-valid bearer key" })
                   return next (new Error ("In-valid bearer key " , {cause:400}))
            }
            const token = authorization.split(process.env.BEARER_KEY)[1]
            if (!token) {
                // return res.json({ message: "In-valid token" })
                return next (new Error ("In-valid token " , {cause:400}))

            }
            const decoded = verifyToken({token})
            if (!decoded?.id) {
             //   return res.json({ message: "In-valid token payload" })
                return next (new Error ("In-valid token payload " , {cause:400}))

            }
            const user = await userModel.findById(decoded.id).select('userName image role changePasswordTime')
            console.log({changePasswordTime: parseInt(user.changePasswordTime?.getTime() / 1000 ),
                tokenIat : decoded.iat});

                if (!user) {
                    // return res.json({ message: "Not register account" })
                     return next (new Error ("Not register account" , {cause:401}))
                 }
                if (parseInt(user.changePasswordTime?.getTime()) / 1000  > decoded.iat) {
                    return next (new Error ("Expired Token" , {cause:400}))
                }
                
           

            if (!accessRoles.includes(user.role)) {
                        return next (new Error ("Not authrized" , {cause:403}))
             }
            
        
            req.user = user;
            return next()
        
    
        })
    }
    // export const authrized =(accessRoles = [])  => {

    // return async (req, res, next) => {
    //         if (!accessRoles.includes(req.user.role)) {
    //             return next (new Error ("Not authrized" , {cause:403}))
    //         }
    //         return next ()
    //     }
    // }

    