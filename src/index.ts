import express from 'express';
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
import cors from 'cors'
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
const app = express();

// debugger;

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
 * Static File
 */
app.use(express.static('public'))
app.use(express.static('files'))
app.use('/static', express.static('public'))
// app.use('/static', express.static(path.join(__dirname, 'public')))
/**
 * Ues route
 */
app.get('/', (req, res) => {
    let count = 3
    // debugger
    res.send('Hello world xxx!' + count);
});

app.use('/book', bookRouter)
app.use('/user', userRouter)

/**
 * Publish port
 */
app.listen(5000);