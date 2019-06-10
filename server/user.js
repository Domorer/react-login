// user.js
const cryptico = require('cryptico')
const express = require('express')
const model = require('./model')
const User = model.getModel('user')
// md5加密
const utils = require('utility')

// 生成express路由中间件
const Router = express.Router();

// 封装MD5加密规则

//生成私钥
// The passphrase used to repeatably generate this RSA key.
var PassPhrase = "The Moon is a Harsh Mistress.";
// The length of the RSA key, in bits.
var Bits = 1024;
var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

//过滤调不想暴露的数据
const _filter = {
    "__v": 0,
    "pwd": 0
}

// CheckLogin.js 用户查询用户是否登录的接口
Router.get('/info', (req, res) => {
    const { userId } = req.cookies
    if (!userId) {
        res.json({ code: 1, msg: '用户未登录' })
    }
    User.findOne({ _id: userId }, _filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '服务器异常' })
        }
        if (doc) {
            return res.json({ code: 0, msg: '用户已登录', data: doc })
        }
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

//获取并返回所有用户信息
Router.get('/allInfo', (req, res) => {
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
        email,
        prov,
        city
    } = req.body;
    //pwd解密
    console.log('username: ', pwd);
    const pwdDecrypt = cryptico.decrypt(pwd, MattsRSAkey);
    console.log('pwdDecrypt: ', pwdDecrypt['plaintext']);

    // 在user这个数据模型中查询用户注册的账号是否存在
    User.findOne({
        username,
        email
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
            pwd: pwdDecrypt['plaintext'],
            email,
            prov,
            city
        }, (err, doc) => {
            if (err) {
                console.log('wrong');

                return res.json({
                    code: 1,
                    msg: '服务器异常'
                })
            }
            console.log('yes');
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
    //pwd解密
    console.log('username: ', pwd);
    const pwdDecrypt = cryptico.decrypt(pwd, MattsRSAkey);
    console.log('pwdDecrypt: ', pwdDecrypt['plaintext']);
    User.findOne({
        username,
        pwd: pwdDecrypt['plaintext']
    }, (err, doc) => {
        if (!doc) {
            console.log('Wrong!');
            return res.json({
                code: 1,
                msg: '账号密码不正确'
            })
        }
        if (err) {
            console.log('err');
            return res.json({
                code: 1,
                msg: '服务器异常'
            })
        }
        console.log('Login success!')
        res.cookie('userId', doc._id) // 登录成功保存cookie
        return res.json({
            code: 0,
            msg: '登录成功',
            data: doc
        })
    })
})


Router.get('/loginOut', (req, res) => {
    const { userId } = req.cookies;
    if (!userId) {
        res.json({ code: 1, msg: '服务器异常' })
    }
    res.cookie('userId', '');
    return res.json({ code: 0, msg: '退出成功' })
})

module.exports = Router
// 这里注意，因为要接受参数，所以在server.js安装body-parser并app.use(bodyParser.json())