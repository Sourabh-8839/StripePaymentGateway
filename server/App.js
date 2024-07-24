// import cookieParser from 'cookie-parser';
const express = require('express');
const cors = require('cors');
const App = express();

App.use(cors());
App.use(express.json({ limit: '16kb' }));

App.use(express.urlencoded({ extended: false, limit: '16kb' }));

// // This is use for only file
// App.use(express.static('public'));

// App.use(cookieParser());

// Routes importing

const UserRoutes = require('./Routes/user.Routes.js');

App.use(UserRoutes);

module.exports = App;
