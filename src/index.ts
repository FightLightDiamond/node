import express from 'express';
import bookRouter from "./routes/book";
import cors from 'cors'
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
const app = express();

/**
 * Use cors
 */
app.use(cors(corsOptions))

/**
 * Use form json, urlencoded
 */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * Ues route
 */
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/book', bookRouter)

/**
 * Publish port
 */
app.listen(5000);