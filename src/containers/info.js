import React, { Component } from 'react'
import InfoTable from '../components/infoCards'
import axios from 'axios'

const cryptico = require('cryptico')
const PUBLICK_KEY = 'uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE='

const styleInfo = {
    width:'100%',
    height:'100%'
}

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
                <InfoTable data={this.state.dataDecrypt} bgColor={'dark'} cardId={'cardDecrypt'} key={'Decrypt'}></InfoTable>
                <InfoTable data={this.state.dataEncrypt} bgColor={'dark'} cardId={'cardEncrypt'} key={'Encrypt'}></InfoTable>
            </div>
        )
    }
    componentDidMount(){
        this.setState({
            data:[{ username: '1', pwd: '2', email: '3', prov: '4', city: '5' },
            { username: '1', pwd: '2', email: '3', prov: '4', city: '5' },
            { username: '1', pwd: '2', email: '3', prov: '4', city: '5' }]
        })
        axios.get('/user/allInfo')  
          .then((res)=> {
            console.log(res);
        
            this.setState({
                dataDecrypt:res.data.data
            })
            //展示加密的结果
            let encryptInfo = res.data.data;
            
            for(let i = 0; i < encryptInfo.length; i++){
                encryptInfo[i].pwd = cryptico.encrypt(encryptInfo[i].pwd, PUBLICK_KEY)['cipher'];
                encryptInfo[i].email = cryptico.encrypt(encryptInfo[i].email, PUBLICK_KEY)['cipher']
                encryptInfo[i].city = cryptico.encrypt(encryptInfo[i].city, PUBLICK_KEY)['cipher']
            }
            console.log('encryptInfo: ', encryptInfo);
            this.setState({
                dataEncrypt:encryptInfo
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default Info