import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import config from "../config/config";
import logging from "../config/logging";

const NAMESPACE = "Auth"

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        let token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, config.server.token.secret, (err, decoded) => {
                if (err) {
                    return res.status(404).json({
                        message: err.message,
                        error: err
                    })
                }

                // @ts-ignore
                logging.info(NAMESPACE, decoded.username)

                res.locals.jwt = decoded
                next()
            })
        } else {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } catch (e) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

export default extractJWT