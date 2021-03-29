import {NextFunction, Request, Response} from 'express'
import bcryptjs, {hash} from 'bcryptjs'
import logging from "../config/logging";
import signJWT from "../functions/signJWT";
import User from "../models/user"
import IUser from "../interfaces/user";

const NAMESPACE = "User"

const validateToken = (req: Request, res: Response, next: NextFunction) => {

}

const register = (req: Request, res: Response, next: NextFunction) => {
    let {email, password} = req.body
    try {
        bcryptjs.hash(password, 10, (hashError: Error, hash: string) => {
            if (hashError) {
                return res.status(500).json({
                    msg: hashError.message,
                    error: hashError
                })
            }

            User.create({email: email, password: hash})
                // user.save({fields: ['email', 'password']})
                .then(function (user) {
                    res.status(200).json({
                        message: 'Register Successfully',
                        data: user
                    })
                })
                .catch(function (err) {
                    res.status(500).json({
                        message: 'Register fail',
                        error: err
                    })
                });
        })
    } catch (e) {
        return res.status(500).json({
            msg: e.message,
            error: e
        })
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    let {email, password} = req.body
    const user = await User.findOne({where: {email: email}});
    if(user) {
        // @ts-ignore
        bcryptjs.compare(password, user.password, (e, result) => {
            if (e) {
                return res.status(401).json({
                    msg: e.message,
                    error: e
                })
            } else if (result) {
                // @ts-ignore
                signJWT(user, (_e, token) => {
                    if (_e) {
                        return res.status(401).json({
                            msg: _e.message,
                            error: _e
                        })
                    } else if(token) {
                        res.status(200).json({
                            message: 'Login Successfully',
                            data: user
                        })
                    }
                })
            }
        })
    } else {
        return res.status(401).json({
            msg: "Not found email",
        })
    }
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {

}


export default {validateToken, register, login, getAllUsers}