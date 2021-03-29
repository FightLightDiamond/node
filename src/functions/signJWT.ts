import jwt from 'jsonwebtoken'
import config from "../config/config";
import logging from "../config/logging";

const NAMESPACE = 'Auth'

// @ts-ignore
const signJWT = (user, callback: (error: (Error | null), token: (string | null)) => void): void => {
    const timeSinchEpoch = new Date().getTime()
    const expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000)
    logging.info(NAMESPACE, ''+timeSinchEpoch)
    logging.info(NAMESPACE, ''+expirationTime)
    logging.info(NAMESPACE, ''+expirationTimeInSeconds)
    logging.info(NAMESPACE, ''+expirationTimeInSeconds)

    try {
        jwt.sign(
            {username: user.get('email')},
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: "ES256",
                expiresIn: expirationTimeInSeconds
            },
            (e, token) => {
                if (e) {
                    callback(e, null)
                } else if (token) {
                    callback(null, token)
                }
            })
    } catch (e) {
        logging.error(NAMESPACE, e.message, e)
        callback(e, null)
    }
}

export default signJWT