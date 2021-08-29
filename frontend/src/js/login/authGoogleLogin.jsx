import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { refreshTokenSetup } from './refreshTokenSetup';

const clientId = "866725412925-ftovfr48c7hbbdm5l96ebaqsc52hodbf.apps.googleusercontent.com";
const redirect_uri = "http://localhost:3000/login";
const LOGIN_URL = "http://localhost:8080/login/google";

class AuthGoogleLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            googleId: '',
            nickname: '',
            email: '',
            image: ''
        }
    }

    responseGoogle = async(response) => {

        this.setState({
            googleId: response.googleId,
            nickname: response.profileObj.name,
            email: response.profileObj.email,
            image: response.profileObj.imageUrl
        });

        console.log(this.state);

        axios.post(LOGIN_URL, this.state).then((res) => {

            // 세션 저장
            const { googleId, nickname, email, image } = this.state;
            window.sessionStorage.setItem('id', googleId);
            window.sessionStorage.setItem('nickname', nickname);
            window.sessionStorage.setItem('email', email);
            window.sessionStorage.setItem('image', image);
            window.sessionStorage.setItem('provider', 'google');

            this.props.history.push('/home'); // 메인으로 이동 
            refreshTokenSetup(response); // 토큰 유지  

        }).catch((err) => {

            this.props.history.push('/login'); // 로그인으로 이동 
            console.log(err);

        }).then(() => {

        });
    }

    onFailure = (error) => {
        console.log(error);
    }

    render() {
        return(
            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="구글로 로그인하기"
                    onSuccess={this.responseGoogle}
                    onFailure={this.onFailure}
                    uxMode="redirect"
                    redirectUri={redirect_uri}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    />

            </div>
        );
    }
}

export default withRouter(AuthGoogleLogin);
