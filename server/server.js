//deklaracje
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('./config/jwt');
const errorHandler = require('./config/error-handler');

//const path = require('path');
//tworzenie serwer
const app = express();
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const port = process.env.PORT || 4000;
//parse
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); 
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
//     next();
// });
const cors = require("cors")
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());
//middlewares
const users = require('./src/routes/users.routes');
app.use('/api/users', users);
const posts = require('./src/routes/posts.routes');
app.use('/api/posts',posts);
const events = require('./src/routes/events.routes');
app.use('/api/events',events);
// global error handler
app.use(errorHandler);
//app.use(express.static(path.join(__dirname, "/build")));
//listening
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


var webSocket = require('./config/webSocket');
