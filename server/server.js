const express = require('express');
const userRouter = require('./user')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// 新建app
const app = express();

app.use('/user', userRouter)

app.listen(8000, () => {
    console.log(`server is running at port 8000 success~~~`);
})