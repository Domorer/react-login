const express = require('express');
const userRouter = require('./user')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// 新建app
const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/user', userRouter)

app.listen(8000, () => {
    console.log(`server is running at port 8000 success~~~`);
})