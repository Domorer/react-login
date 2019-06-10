import React, { Component } from 'react'
import '../bootstrap/css/bootstrap.min.css'
import axios from 'axios' // 用axios做请求

import '../style/login.css'

import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login, test } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'
import { resolve } from 'path';
const cryptico = require('cryptico')
const PUBLICK_KEY = 'uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE='

// @connect(
//     state => state,
//     {login}
// )
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', //账号
            pwd: '', // 密码
            redirectTo: '', // 完成之后跳到哪里
            msg: '', // 错误消息
            isLogin: false // 是否登录
        }
    }
    render() {
        return (
            <Form className='login'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={(e) => this.handleChange('username', e.target.value)} />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" onChange={(e) => this.handleChange('pwd', e.target.value)} />
                </Form.Group>


                {/* <Row>
                    <Col>
                        <Form.Control type="username" placeholder="Enter username" onChange={(e) => this.handleChange('username', e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control type="password" placeholder="password" onChange={(e) => this.handleChange('pwd', e.target.value)} />
                    </Col>
                </Row> */}
                <Form.Text className="text-muted">
                    没有账号？去<a href='/register'>注册</a>.
                    </Form.Text>
                <Button id='bt_lg' variant="primary" type="button" onClick={() => this.handleLogin()} block>登录</Button>
                {/* {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}></Redirect> : null}
                <div className="err-show">{this.props.user.msg ? this.props.user.msg : ''}</div> */}
            </Form>
        )
    }

    componentDidMount() {
        console.log(this.props);
    }
    /*
    *     去注册
    * */
    handleLogin = () => {
        const pwdEncrypt = cryptico.encrypt(this.state.pwd, PUBLICK_KEY);
        console.log('pwdEncrypt: ', pwdEncrypt);
        let username = this.state.username;
                axios.post('/user/login', {
                    username,
                    pwd: pwdEncrypt['cipher']
                }).then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.props.history.push('/info');
                    } else {
                        alert('账号密码错误，登入失败');
                    }
                })
        
    }

    handleGoRegister = () => {
        this.props.history.push('/register');
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }
}

export default Login