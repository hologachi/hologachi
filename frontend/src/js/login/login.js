import '../../css/login.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthGoogleLogin from './authGoogleLogin';

class Login extends Component {

    render() {

        return (
            <div className="login">
                
                <AuthGoogleLogin />

            </div>
        )
    }
}

export default Login