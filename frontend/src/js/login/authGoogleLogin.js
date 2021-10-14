import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { refreshTokenSetup } from './refreshTokenSetup';

const clientId = `${process.env.REACT_APP_API_KEY}`;
const redirect_uri = "http://localhost:3000/home";
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

        axios.post(LOGIN_URL, this.state).then(async(res) => {

            // 세션 저장
            const { googleId, nickname, email, image } = this.state;
            window.sessionStorage.setItem('userId', res.data.userId);
            window.sessionStorage.setItem('googleId', googleId);
            window.sessionStorage.setItem('nickname', nickname);
            window.sessionStorage.setItem('email', email);
            window.sessionStorage.setItem('image', image);
            window.sessionStorage.setItem('provider', 'google');
            window.sessionStorage.setItem('isAdmin', res.data.isAdmin);

            // this.props.history.push('/home'); // 메인으로 이동
            window.location.reload(false); // 메인 리로드
            refreshTokenSetup(response); // 토큰 유지  

        }).catch((err) => {

            // this.props.history.push('/home'); // 로그인으로 이동 
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
                    render={renderProps => (
                        <Button variant="info" onClick={renderProps.onClick}>구글로 로그인하기</Button>
                      )}
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

export default AuthGoogleLogin;
