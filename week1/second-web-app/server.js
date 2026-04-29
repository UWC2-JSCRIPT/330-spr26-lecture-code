import express from 'express';

const server = express();

server.use(express.json());
server.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`Request ${req.method} ${req.path}`);
    next();
});

server.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><p>:D</p>');
});

server.get('/books/index', (req, res) => {
    res.send(`Books index page`);
})

server.get('/books/:bookId', (req, res) => {
    const {bookId} = req.params;
    console.log("bookId: ", bookId)
    res.send(`You passed in a book id of: ${bookId}`);
})



export default server;
