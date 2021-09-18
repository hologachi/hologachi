import React from 'react';
import { GoogleLogout } from 'react-google-login'

const clientId = "866725412925-ftovfr48c7hbbdm5l96ebaqsc52hodbf.apps.googleusercontent.com";

export default function authGoogleLogout(props){
    const logout = async(response) => {

        window.sessionStorage.clear(); // 세션 정보 삭제
    	console.log('Logout Success: ', response);
        props.setIsLogined(false);
        window.location.href="/home"
    }

    const onFailure = (error) => {

        console.log('Logout Failed: ', error);

    }

    return(
        <div className="logout">
            <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={logout}
                onFailure={onFailure}/>
        </div>
    )
}
