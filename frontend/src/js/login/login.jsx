import '../../css/login.css';
import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {

    render() {

        return (
            <div className="login">
                <Header />
                
                <button>구글로 로그인하기</button>
                <br />
                <button>네이버로 로그인하기</button>
                <td colspan="2"></td>
                <Footer />
            </div>
        )
    }
}

export default Login