import '../../css/login.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthGoogleLogin from './authGoogleLogin.jsx';
import AuthGoogleLogout from './authGoogleLogout.jsx';

class Login extends Component {

    render() {

        return (
            <div className="login">
                
                <AuthGoogleLogin />
                <AuthGoogleLogout />
                <br />
                <button>네이버로 로그인하기</button>
                <td colspan="2"></td>
            </div>
        )
    }
}

export default Login