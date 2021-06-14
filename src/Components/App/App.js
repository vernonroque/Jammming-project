import './App.css';
import React from 'react';
import {SearchBar} from './SearchBar/SearchBar.js';
import {SearchResults} from './SearchResults/SearchResults.js';
import {Playlist} from './Playlist/Playlist.js';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {searchResults:[],
                  playlistName:'',
                  playlistTracks:[{name:''},{artist:''},{album:''},{id:''}]
                  };
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
            <SearchBar />;
          <div className="App-playlist">
            {/*<!-- Add a SearchResults component -->*/}
              <SearchResults searchResults ={this.state.searchResults} />;
            {/*<!-- Add a Playlist component -->*/}
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />;
          </div>
        </div>
    </div>
      );
  }
}

