import React, { Component } from 'react'
import InfoTable from '../components/infoCards'
import axios from 'axios'
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loginOut} from '../redux/user.redux'

const cryptico = require('cryptico')
const PUBLICK_KEY = 'uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE='

const styleInfo = {
    width: '100%',
    height: '100%',
}

@connect(
    state=>state,
    {loginOut}
)

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', //账号
            pwd: '', // 密码
            dataDecrypt: [],
            dataEncrypt: []
        }
    }


    render() {
        return (
            <div style={styleInfo}>
                <Navbar bg="dark" expand="lg" variant='dark'>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                        <Form inline>
                            <Button variant="outline-success" onClick={()=>this.handleLoginOut()}>Logout</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    <InfoTable data={this.state.dataDecrypt} bgColor={'dark'} cardId={'cardDecrypt'} key={'Decrypt'}></InfoTable>
                    <InfoTable data={this.state.dataEncrypt} bgColor={'dark'} cardId={'cardEncrypt'} key={'Encrypt'}></InfoTable>
                </div>

            </div>
        )
    }
    componentDidMount() {

        axios.get('/user/allInfo')
            .then((res) => {
                console.log(res);

                this.setState({
                    dataDecrypt: res.data.data
                })
                //展示加密的结果
                let encryptInfo = res.data.data;

                for (let i = 0; i < encryptInfo.length; i++) {
                    encryptInfo[i].pwd = cryptico.decrypt(encryptInfo[i].pwd, PUBLICK_KEY)['plaintext'];
                    encryptInfo[i].email = cryptico.decrypt(encryptInfo[i].email, PUBLICK_KEY)['plaintext']
                    encryptInfo[i].city = cryptico.decrypt(encryptInfo[i].city, PUBLICK_KEY)['plaintext']
                }
                console.log('encryptInfo: ', encryptInfo);
                this.setState({
                    dataEncrypt: encryptInfo
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    handleLoginOut = () => {
        // this.props.loginOut();
    }
}

export default Info