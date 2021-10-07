import {NextFunction, Request, Response} from "express"
import {Connect, Query} from "../config/mysql";
import fs from 'fs'
import {IncomingForm} from 'formidable'

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'pong'
    })
}

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    let query = 'SELECT * FROM users'

    Connect().then(connection => {
        Query(connection, query).then(results => {
            return res.status(200).json({
                results
            })
        }).catch(e => {
            return res.status(500).json({
                message: e.message,
                e,
                description: "Get book error"
            })
        }).finally(() => {
            connection.end()
        })
    }).catch(e => {
        return res.status(500).json({
            message: e.message,
            e,
            description: "ERROR connect mysql"
        })
    })
}


const createBook = async (req: Request, res: Response, next: NextFunction) => {
    let {email, password} = req.body
    const query = `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`
    Connect().then(connection => {
        Query(connection, query).then(results => {
            return res.status(200).json({
                results
            })
        }).catch(e => {
            return res.status(500).json({
                message: e.message,
                e,
                description: "Create book error"
            })
        }).finally(() => {
            connection.end()
        })
    }).catch(e => {
        return res.status(500).json({
            message: e.message,
            e,
            description: "ERROR connect mysql - Create book"
        })
    })
}

const upload = (req: Request, res: Response, next: NextFunction) => {
    const form = new IncomingForm();
    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        const oldPath = file.path;
        const newPath = './' + file.name;
        fs.rename(oldPath, newPath, (e) => {
            if (e) throw e;
        });
    })

    form.on('end', () => {
        res.json();
    })

    // form.parse(req, (err, fields, files) => {
    //     if ("path" in files.file) {
    //         const oldPath = files.file.path;
    //         const newPath = './' + files.file.name;
    //         fs.rename(oldPath, newPath, (e) => {
    //             if (e) throw e;
    //         });
    //     }
    // });
}


export default {getAllBooks, serverHealthCheck, createBook, upload}