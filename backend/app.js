const cors = require('cors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const photoRoute = require('./routes/photoRoute')
const commentRoute = require('./routes/commentRoute')
const likeRoute = require('./routes/likeRoute')
const app = express();
const port = 3000

app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
    credentials: true
  }));

app.use(express.urlencoded({extended: true}))

app.use('/user', userRoute)
app.use('/photo', photoRoute)
app.use('/comment', commentRoute)
app.use('/like', likeRoute)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

if (process.env.NODE_ENV != "test"){

    app.listen(port, () =>{
        console.log(`Server Running in port ${port}`)
    })
}

module.exports = app
