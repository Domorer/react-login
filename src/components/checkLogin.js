import React, {
    Component
} from 'react';
import {withRouter} from 'react-router-dom' // 由于checkLogin 不是路由，要想用跳转的话得引入withRouter
import axios from 'axios' // 用axios做请求

@withRouter
class CheckLogin extends Component {

    componentDidMount() {
        // 登录注册两个页面不需要判断
       
        // 在这里请求相关接口判断用户是否完成登录
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        console.log(res.data);
                    } else {
                        this.props.history.push('/login');
                    }
                }
            })
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}

export default CheckLogin;