import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const clientId = "866725412925-ftovfr48c7hbbdm5l96ebaqsc52hodbf.apps.googleusercontent.com";
const redirect_uri = "http://localhost:3000/home";
const LOGIN_URL = "http://localhost:8080/login/google";

export default function googleAuth({ onSocial }){
    const onSuccess = async(response) => {
    	console.log(response);
        const newbie = {
            googleId: response.profileObj.googleId,
            nickname: response.profileObj.name,
            email: response.profileObj.email,
            image: response.profileObj.imageUrl,
            accessToken: response.tokenObj.access_token,
            expire: response.tokenObj.expires_at,
            tokenType: response.tokenObj.token_type, 
            // idToken: response.tokenObj.id_token
        }
        console.log(newbie);
        axios.post(LOGIN_URL, newbie).then((res) => {
           
        }).catch((err) => {
            console.log(err);
        }).then(() => {

        })
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="구글로 로그인하기"
                onSuccess={onSuccess}
                onFailure={onFailure}
                uxMode="redirect"
                redirectUri={redirect_uri}
                cookiePolicy={'single_host_origin'}/>

        </div>
    )
}
