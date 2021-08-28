import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "866725412925-ftovfr48c7hbbdm5l96ebaqsc52hodbf.apps.googleusercontent.com";

export default function googleAuth({ onSocial }){
    const onSuccess = async(response) => {
    	console.log(response);
    
        // const { googleId, profileObj : { email, name } } = response;
        
        // await onSocial({
        //     socialId : googleId,
        //     socialType : 'google',
        //     email,
        //     nickname : name
        // });
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={onSuccess}
                onFailure={onFailure}/>
        </div>
    )
}
