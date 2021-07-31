import '../../css/login.css';
import React, { Component } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

class CompleteLogin extends Component {

    render() {

        let userNickname = "테스트";

        return (
            <div className="compeleteLogin">
                <Header />
                
                <div className="welcome-message">
                        <table>
                            <tr>
                                <td>회원가입을 완료했습니다</td>
                            </tr>
                            <tr>
                                <td>{userNickname}회원님 환영합니다</td>
                            </tr>
                            <tr>
                                <td colspan="2"><Link to="/" /></td>
                            </tr>
                        </table>
                </div>

                <Footer />
            </div>
        )
    }
}

export default CompleteLogin