import express from 'express';
import mustacheExpress from 'mustache-express';

const server = express();

server.engine('mustache', mustacheExpress());
server.set('view engine', 'mustache');
server.set('views', __dirname + '/views');

server.use(express.json());
server.get('/', (req, res) => {
    const items = [
        {name: 'Ichiro statue' },
        {name: 'Crab nachos in a ferry' },
        {name: `Big Dumper's catcher helmet` },
    ];

    return res.render('index', { dateTime: new Date(), items, showItems: true });
});

export default server;
