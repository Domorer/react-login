import React, { Component } from 'react'
import '../bootstrap/css/bootstrap.min.css'

import '../style/login.css'

import { Button, Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import { login, test} from '../redux/user.redux'
// import { Redirect } from 'react-router-dom'

@connect(
    state => state,
    {login}
)
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
                <Button id='bt_lg' variant="primary" type="submit" onClick={() => this.handleLogin()} block>登录</Button>
                {/* {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}></Redirect> : null}
                <div className="err-show">{this.props.user.msg ? this.props.user.msg : ''}</div> */}
            </Form>
        )
    }

    componentDidMount(){
        console.log(this.props);
    }
    /*
    *     去注册
    * */
    handleLogin = () => {
        this.props.login(this.state)
        this.props.history.push('/info')
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