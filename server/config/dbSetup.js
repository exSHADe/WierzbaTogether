//konfiguracja chmurowej bazy danych
const dbConfig = require('./dbconfig.js');
const mongoose = require('mongoose');
const dbConnectOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
//połączenie bazy danych
mongoose.connect(process.env.MONGODB_URI || dbConfig.connectionString,dbConnectOptions )
.then(() => {
    console.log("Successfully connected to the database");    
})
.catch(err => {
    console.log('Could not connect to the database.');
    process.exit();
});
//global promise
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../src/models/users.model'),
    Post: require('../src/models/posts.model'),
    Event: require('../src/models//events.model')
};