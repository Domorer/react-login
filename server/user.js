// user.js
const express = require('express')
const model = require('./model')
const User = model.getModel('user')
// md5加密
const utils = require('utility')

// 生成express路由中间件
const Router = express.Router();

// 封装MD5加密规则
function my_md5(pwd) {
    const xiao = 'akdf352FHhjfFHI34=123-`.WRL23K23fhKJFHkhFJ@1231!*@%!^';
    return utils.md5(utils.md5(xiao + pwd))
}

//过滤调不想暴露的数据
const _filter = {
    "__v": 0,
    "pwd": 0
}

// CheckLogin.js 用户查询用户是否登录的接口
Router.get('/info', (req, res) => {
    return res.json({
        code: 1,
        msg: '未登录'
    })
})

// 获取注册用户列表
Router.get('/list', (req, res) => {
    //清空所有用户
    // User.remove({}, (err, doc) => {
    //  if (!err) {
    //      console.log(`用户清空成功`);
    //  }
    // })

    // 在user这个数据模型中查询所有用户
    User.find({}, (err, doc) => {
        if (!err) {
            return res.json({
                code: 0,
                data: doc,
                msg: '用户列表获取成功'
            })
        }
    })
})

// 注册接口
Router.post('/register', (req, res) => {
    const {
        username,
        pwd,
        type
    } = req.body;
    // 在user这个数据模型中查询用户注册的账号是否存在
    User.findOne({
        username
    }, (err, doc) => {
        //
        if (doc) {
            return res.json({
                code: 1,
                msg: '用户已存在'
            })
        }
        if (err) {
            return res.json({
                code: 1,
                msg: '服务器异常'
            })
        }
        User.create({
            username,
            pwd: my_md5(pwd),
            type
        }, (err, doc) => {
            if (err) {
                return res.json({
                    code: 1,
                    msg: '服务器异常'
                })
            }
            return res.json({
                code: 0,
                data: doc
            })
        })
    })
})

Router.post('/login', (req, res) => {
    const {
        username,
        pwd
    } = req.body;
    console.log(username);
    User.findOne({
        username,
        pwd: my_md5(pwd)
    }, _filter, (err, doc) => {
        if (!doc) {
            return res.json({
                code: 1,
                msg: '账号密码不正确'
            })
        }
        if (err) {
            return res.json({
                code: 1,
                msg: '服务器异常'
            })
        }
        res.cookie('userId', doc._id) // 登录成功保存cookie
        return res.json({
            code: 0,
            msg: '登录成功',
            data: doc
        })
    })
})


Router.get('/info', (req, res) => {
    const {userId} = req.cookies
    if (!userId) {
        res.json({code: 1, msg: '用户未登录'})
    }
    User.findOne({_id: userId}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '服务器异常'})
        }
        if (doc) {
            return res.json({code: 0, msg: '用户已登录',data: doc})
        }
    })
})

module.exports = Router
// 这里注意，因为要接受参数，所以在server.js安装body-parser并app.use(bodyParser.json())