import mysql from 'mysql'
import config from "./config";

const params = {
    host: config.mysql.host,
    database: config.mysql.database,
    user: config.mysql.user,
    password: config.mysql.password
}

const Connect = async () => new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params)
    connection.connect(e => {
        if (e) {
            reject(e)
        }
        resolve(connection)
    })
})

const Query = async (connection: mysql.Connection, query: string) => new Promise((resolve, reject) => {
    connection.query(query, connection, (e, result) => {
        if (e) {
            reject(e)
        }
        resolve(result)
    })
})

export {Connect, Query}