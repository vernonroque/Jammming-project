import React from 'react';

let accessToken='';

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        else if(window.location.href.match(/access_token=([^&]*)/) 
                && window.location.href.match(/expires_in=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/);
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/); 

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            


        }


    }
}
