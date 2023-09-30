
let accessToken;
const clientID=process.env.REACT_APP_SPOTIFY_CLIENT_ID;
//const redirectURI='http://jammming_app_project.surge.sh';
//const redirectURI='http://localhost:3000/';
const redirectURI='https://sweet-malasada-1bb69a.netlify.app';

const Spotify = {
    getAccessToken(){
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessToken){
            return accessToken;
        }
        else if(accessTokenMatch 
                && expiresInMatch ) {
            console.log("The saved access token: " + accessTokenMatch[1]);
            accessToken = accessTokenMatch[1];
            
            let expiresIn = Number(expiresInMatch[1]); 
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
                }

        else if(!accessToken && !window.location.href.match(/access_token=([^&]*)/)){
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(searchTerm){
        const passedAccessToken = Spotify.getAccessToken();
        console.log('This is the passed access token:' + passedAccessToken);
        console.log('this is the search term: ' + searchTerm)
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const header ={Authorization: `Bearer ${passedAccessToken}`};
        console.log(header);

        return fetch(endpoint,
            {headers: header}
            )
            .then(response=>{
                if(response.ok){
                return response.json();
                    }
                throw new Error('Request Failed!');},
                (networkError)=>{
                    console.log(networkError.message);
                })
            .then(jsonResponse => {
                if(!jsonResponse){
                    return [];
                }
                return jsonResponse.tracks.items.map((track)=>(
                    {   id:track.id,
                        name:track.name,
                        artist:track.artists[0].name,
                        album:track.album.name,
                        uri:track.uri,
                        preview:track.preview_url
                    }
              ));
            });
    },
    savePlaylist(playlistName,trackURIArrays){
        if(!playlistName && !trackURIArrays)
            return [];
        
        let usersAccessToken = Spotify.getAccessToken();
        const header = {Authorization:`Bearer ${usersAccessToken}`}; //not entirely sure
        console.log('access token to get request in save playlist: ' + header.Authorization);
        let userId='';
        const urlToFetch= 'https://api.spotify.com/v1/me';

        return fetch(urlToFetch,{headers: header})
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
                throw new Error('Request Failed!');},
                (networkError)=>{
                    console.log(networkError.message);
                })
            .then(jsonResponse=>{
                userId=jsonResponse.id;
                return userId;
                })
            .then(userId =>{
                const urlForPost = `https://api.spotify.com/v1/users/${userId}/playlists`; 
                const name = playlistName;
                console.log('access token to first POST request in save playlist: ' + header.Authorization);

                return fetch(urlForPost,{
                    headers: header,
                    method:'POST',
                    body:JSON.stringify({name:name})
                    })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }
                        throw new Error('Request failed!');
                    },
                    networkError => console.log(networkError.message)
                    )
                    .then(jsonResponse=>{
                        const playlistID = jsonResponse.id;
                        return playlistID;
                    })

            })
            .then((playlistId) =>{
                const urlForPost = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
                const trackURIs = trackURIArrays;
                console.log('access token to SECOND POST request in save playlist: ' + header.Authorization);

                return fetch(urlForPost,{
                    headers: header,
                    method:'POST',
                    body:JSON.stringify({uris:trackURIs})
                    })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }
                        throw new Error('Request failed!');
                    },
                    networkError => console.log(networkError.message)
                    )
                    .then(jsonResponse=>{
                        const playlistID = jsonResponse.id;
                        return playlistID;
                    })




            })
 


    }
}
export default Spotify;
