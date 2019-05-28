// server/model.js
const express = require('express')
const Router = express.Router();
const mongoose = require('mongoose')
const model = require('./model')
const User = model.getModel('user')

// mongoose 连接这个数据库并生成"react-login-register"这个集合
mongoose.connect('mongodb://127.0.0.1:27017/trading-web')

// 连接成功后的打印
mongoose.connection.on('connected',() => {
    console.log('mongo connect success');
})

// 创建数据模型
const models = {
    user: {
        'username': {type:String, require: true}, // 账号
        'pwd': {type:String, require: true}, // 密码
        'type': {type:String, require: true} // 用户类型
    }
}

// 遍历生成数据模型
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

// 导出供其他地方获取
module.exports = {
    getModel: function (m) {
        return mongoose.model(m)
    }
}

// server/user.js
// 获取注册用户列表
Router.get('/list',(req,res) => {
    //清空所有用户
    // User.remove({},(err,doc) => {
    //  if(!err) {
    //      console.log(`用户清空成功`);
    //  }
    // })
    // 在user这个数据模型中查询所有用户
    User.find({},(err,doc) => {
        if(!err) {
            return res.json({code: 0, data: doc,msg: '用户列表获取成功'})
        }
    })
})