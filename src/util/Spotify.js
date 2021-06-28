
let accessToken;
const clientID='53d98329c41b4e2d9274aed2a2d37675';
const redirectURI='http://localhost:3000/';

export const Spotify = {
    getAccessToken(){
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessToken){
            return accessToken;
        }
        else if(accessTokenMatch 
                && expiresInMatch ) {
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
                return jsonResponse.tracks.items.map((track)=>[
                    {   id:track.id,
                        Name:track.name,
                        Artist:track.artists[0].name,
                        Album:track.album.name,
                        URI:track.uri}]);
            });
    },
    savePlaylist(playlistName,trackURIArrays){
        if(!playlistName && !trackURIArrays)
            return [];
        
        let usersAccessToken = accessToken;
        const header = {
            'Authorization':`Bearer ${usersAccessToken}` //not entirely sure
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
