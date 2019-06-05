import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../redux/user.redux';
import { Button, Form, Col } from 'react-bootstrap';
import '../style/register.css';

import { Redirect } from 'react-router-dom'

@connect(state => state, { register })
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
            type="submit"
            onClick={() => this.handleRegister()}
          >
            注册
          </Button>
          {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}></Redirect> : null}
          <div className="err-show">{this.props.user.msg ? this.props.user.msg : ''}</div>
        </Form>
      </div>
    );
  }
  handleRegister = () => {
    this.props.register(this.state);
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
