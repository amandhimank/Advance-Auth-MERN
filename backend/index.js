const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;
const db = require('./db/connectDB');

const _dirname = path.resolve();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: "http://localhost:5173", // Change this to your frontend's origin
    credentials: true // Allow cookies to be sent
}));

app.use(bodyParser.json()); // allows us to parse incoming JSON data in request body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(express.urlencoded({ extended: false }))

const authRoutes = require('./routes/auth.route');
app.use('/auth', authRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => { 
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
