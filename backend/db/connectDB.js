const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("successfully connected to Mongodb");
})
db.on('disconnected', () => {
    console.log("successfully disconnected from Mongodb");
})
db.on('error', () => {
    console.log("error occurred");
})

module.exports = db;