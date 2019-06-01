import React, { Component } from 'react'
import { List, InputItem, WingBlank, WhiteSpace } from 'antd-mobile'
import '../bootstrap/css/bootstrap.css'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {login} from '../redux/user.redux'

@connect (
    state => state,
    {login}
)
class Login extends Component {
    render() {
        return (
            <div className="page-login">
                <Button  variant='primary'>test</Button>
                <List>
                    <InputItem>lbj-账号</InputItem>
                    <InputItem>lbj-密码</InputItem>
                </List>
                <WingBlank>
                    <Button type="primary" onClick={()=>this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={()=>this.handleGoRegister.bind(this)} type="primary">去注册</Button>
                </WingBlank>
            </div>
            
        )
    }
    /*
    *     去注册
    * */
    handleLogin() {
        this.props.login(this.state)
    }
    handleGoRegister() {
        this.props.history.push('/register');
    }
}

export default Login