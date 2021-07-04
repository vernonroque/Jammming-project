
import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {searchResults:[],
                  playlistName:'',
                  playlistTracks:[],
                  searchTerm:''
                  };
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
    //this.searchResults=this.searchResults.bind(this);
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id===track.id)){
        return;
      }
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks:this.state.playlistTracks});
    }
    removeTrack(track){
      const updatedList= this.state.playlistTracks.filter(savedTrack=> savedTrack.id!==track.id);
        this.setState({playlistTracks:updatedList})
    }
    updatePlaylistName(name){
      this.setState({playlistName:name});
    }
    savePlaylist(){
      const trackURIs =this.state.playlistTracks.map(track=>track.uri);
      console.log("track URIs:" + trackURIs);
      Spotify.savePlaylist(this.state.playlistName,trackURIs);
      this.setState({playlistName:'New Playlist'});
      this.setState({playlistTracks:[]});  
          
    }
    search(searchTerm){
      //this.setState({searchTerm:searchTerm});
      Spotify.search(searchTerm).then(searchResults => this.setState({searchResults:searchResults}));
      console.log('this is the search term: ' + searchTerm);
    }
  
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
            <SearchBar onSearch={this.search} searchTerm={this.state.searchTerm} />
          <div className="App-playlist">
            {/*<!-- Add a SearchResults component -->*/}
              <SearchResults searchResults ={this.state.searchResults} onAdd={this.addTrack} />
            {/*<!-- Add a Playlist component -->*/}
              <Playlist playlistName={this.state.playlistName}
               playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
               onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
    </div>
      );
  }
}

