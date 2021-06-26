
let accessToken='';
const clientID='53d98329c41b4e2d9274aed2a2d37675';
const redirectURI='http://localhost:3000/';

export const Spotify = {
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

        else if(!accessToken && !window.location.href.match(/access_token=([^&]*)/)){
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(searchTerm){
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;

        fetch(endpoint,{headers: {Authorization: `Bearer ${accessToken}`}}).then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('Request Failed!');},
            (networkError)=>{
                console.log(networkError.message);
            }).then(jsonResponse => {
                if(!jsonResponse)
                    return [];
                let tracksArray =jsonResponse.map((track)=>[
                    {ID:track.id,
                        Name:track.name,
                        Artist:track.artists[0].name,
                        Album:track.album.name,
                        URI:track.uri}]);

                    return tracksArray;
            });
    },
    savePlaylist(playlistName,trackURIArrays){
        if(!playlistName && !trackURIArrays)
            return [];
        
        let usersAccessToken = accessToken;
        const header = {
            Authorization:`Bearer ${usersAccessToken}` //not entirely sure
        };
        let userId='';
        const urlToFetch= 'https://api.spotify.com/v1/me';

        fetch(urlToFetch,header)
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
                });

            const urlForPost = `https://api.spotify.com/v1/users/${userId}/playlists`; 
            const name = playlistName;
        
        fetch(urlForPost,{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
                },
            body:name
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

        

    }
}
