const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const db = require('./db/connectDB');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // allows us to parse incoming JSON data in request body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use(cors({
    origin: 'http://localhost:5173/', // Change this to your frontend's origin
    credentials: true // Allow cookies to be sent
}));

app.get('/', function(req, res) {
    res.send('Hello world');  
})

const authRoutes = require('./routes/auth.route');
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
