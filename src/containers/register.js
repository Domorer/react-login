import React, { Component } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import '../style/register.css';
import qs from 'qs'
import axios from 'axios' // 用axios做请求

const cryptico = require('cryptico')
const PUBLICK_KEY = 'uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE='


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', //账号
      email: '', //邮箱
      pwd: '', // 密码
      prov: '', //省份
      city: '', //城市
    };
  }

  render() {
    return (
      <div>
        <Form className="register">
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                onChange={e => this.handleChange('username', e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => this.handleChange('pwd', e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Enter your email"
              type="email"
              onChange={e => this.handleChange('email', e.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control
                onChange={e => this.handleChange('prov', e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={e => this.handleChange('city', e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Agree to terms and conditions" />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={() => this.handleRegister()}
          >
            注册
          </Button>

        </Form>
      </div>
    );
  }
  handleRegister = () => {
    if (!this.state.username || !this.state.pwd) {
      alert('账号密码不能为空')
    } else {
      //加密 pwd
      const pwdEncrypt = cryptico.encrypt(this.state.pwd, PUBLICK_KEY);
      console.log('pwdEncrypt: ', pwdEncrypt);
      let info = this.state;
      info['pwd'] = pwdEncrypt['cipher']
      axios.post('/user/register', qs.stringify(info))
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            alert('注册成功！');
            this.props.history.push('/login');
          } else {
            alert('注册失败')
          }
        })

    }

  }

  /*
    *     绑定表单值
    * */
  handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }
}

export default Register;
