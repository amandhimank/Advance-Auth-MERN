const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const db = require('./db/connectDB');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // allows us to parse incoming JSON data in request body
app.use(cookieParser()); // allows us to parse incoming cookies 

app.get('/', function(req, res) {
    res.send('Hello world');  
})

const authRoutes = require('./routes/auth.route');
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
