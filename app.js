const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

const http = require('http');
const socketIo = require('socket.io');

const connectDB = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
connectDB();

// Initialize App
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dev Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Express Session Middleware
// key: The name of the cookie - if left default (connect.sid), it can be detected and give away that an application is using Express as a web server.
// httpOnly: Flags cookies to be accessible by the issuing web server, which assists in preventing session hijacking.
// secure: Ensure that it is set to true - which requires TLS/SSL - to allow the cookie to only be used with HTTPS requests, and not insecure HTTP requests.
// domain: Indicates the specific domain that the cookie can be accessed from.
// path: indicates the path that the cookie is accepted on within an application's domain.
// expires: The expiration date of the cookie being set. Defaults to a session cookie. When setting a cookie, the application is storing data on the server. If a timely expiration is not set up on the cookie, the Express application could start consuming resources that would otherwise be free.
app.use(
    session({
        key: '_SESSION',
        secret: 'b2441902-4d8e-4bbf-b27c-238aa4d7ad52_for_session_cookie_salt',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// create server for websocket connection

// var io = socket.listen(server);
io.sockets.on('connection', function () {
    console.log('hello world im a hot socket');
});

// set socket.io to be able to use within route handlers
app.set('socketio', io);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/cards', require('./routes/cards'));
app.use('/decks', require('./routes/decks'));
app.use('/play', require('./routes/play'));

// let interval;

// /quickplay/:id
// io.on('connection', (socket) => {
//     console.log('New client connected');
//     if (interval) {
//         clearInterval(interval);
//     }
//     interval = setInterval(() => getApiAndEmit(socket), 1000);
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//         clearInterval(interval);
//     });
// });

// Static Folder (may not use)
// app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

server.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`
    )
);
