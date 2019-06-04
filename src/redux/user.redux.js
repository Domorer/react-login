// user.redux.js
import axios from 'axios' // 用axios做请求
import qs from 'qs'
const cryptico = require('cryptico')
// 定义常量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'; // 注册成功
const TODO_ERRSHOW = 'TODO_ERRSHOW'; // 操作失败
const GET_USER_INFO = 'GET_USER_INFO'; //获取用户数据
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGINOUT_SUCCESS = 'LOGINOUT_SUCCESS';
const PUBLICK_KEY = 'uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE='
// state初始值
let initState = {
    redirectTo: '', // 完成之后跳到哪里
    username: '', // 账号
    pwd: '', // 密码
    msg: '', // 错误消息
    isLogin: false // 是否登录
}

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state, ...action.data, msg: '', redirectTo: ''
            }
        case LOGIN_SUCCESS:
            return {
                ...state, ...action.data, msg: '', redirectTo: ''
            }
        case TODO_ERRSHOW:
            return {
                ...state, msg: action.msg
            }
        default:
            return state;
    }
}

function registerFail(msg) {
    return {
        msg,
        type: TODO_ERRSHOW
    }
}

function registerSuccess(data) {
    console.log("I'am here！")
    return {
        data,
        type: REGISTER_SUCCESS
    }
}

function toDoFail(msg) {
    return {
        msg,
        type: TODO_ERRSHOW
    }
}

function loginSuccess(data) {
    return {
        data,
        type: LOGIN_SUCCESS
    }
}

function loginOutSuccess(data) {
    return {
        data,
        type: LOGINOUT_SUCCESS
    }
}

export function test(){
    
}
// register是一个action creator ，返回的action供user这个reducer使用，从而改变state
export function register({
    username,
    pwd,
    email,
    prov,
    city
}) {
    console.log(username);
    if (!username || !pwd) {
        registerFail('账号密码不能为空')
    }
    //加密 pwd
    const pwdEncrypt = cryptico.encrypt(pwd, PUBLICK_KEY);
    console.log('pwdEncrypt: ', pwdEncrypt);
    return dispatch => {
        const info = {
            username,
            pwd: pwdEncrypt['cipher'],
            email: email,
            prov: prov,
            city: city,
        }
        axios.post('/user/register', qs.stringify(info))
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.data))
                } else {
                    dispatch(registerFail(res.data.msg))
                }
            })
    }
}


// 登录时候调用
export function login({
    redirectTo, // 完成之后跳到哪里
    username, // 账号
    pwd, // 密码
    msg, // 错误消息
    isLogin // 是否登录
}) {
    if (!username || !pwd) {
        return toDoFail('账号密码不能为空')
    }
    const pwdEncrypt = cryptico.encrypt(pwd, PUBLICK_KEY);
    console.log('pwdEncrypt: ', pwdEncrypt);

    return dispatch => {
        axios.post('/user/login', {
            username,
            pwd: pwdEncrypt['cipher'],
            dispatch,
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(toDoFail(res.data.msg))
            }
        })
    }
}



export function loginOut() {
    return dispatch => {
        axios.get('/user/loginOut')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginOutSuccess(res.data.data))
                } else {
                    dispatch(toDoFail(res.data.msg))
                }
            })
    }
}

// 登录之后获取用户信息
export function getUserInfo(userInfo) {
    return {
        type: GET_USER_INFO,
        payload: userInfo
    }
}