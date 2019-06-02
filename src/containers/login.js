import React, { Component } from 'react'
import '../bootstrap/css/bootstrap.min.css'

import '../style/login.css'

import { Button, Form, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from '../redux/user.redux'

@connect(
    state => state,
    { login }
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', //账号
            pwd: '', // 密码
        }
    }
    render() {
        return (
            <Form className='login'>
                <Row>
                    <Col >
                        <Form.Control type="username" placeholder="Enter username" onChange={(e) => this.handleChange('username', e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form.Control type="password" placeholder="password" onChange={(e) => this.handleChange('pwd', e.target.value)} />
                    </Col>
                </Row>
                <Form.Text className="text-muted">
                    没有账号？去<a href='/register'>注册</a>.
                    </Form.Text>
                <Button id='bt_lg' variant="primary" type="submit" onClick={() => this.handleLogin().bind(this)} block>登录</Button>
            </Form>
        )
    }
    /*
    *     去注册
    * */
    handleLogin() {
        console.log('test');
        this.props.login(this.state)
    }

    handleGoRegister() {
        this.props.history.push('/register');
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
}

export default Login