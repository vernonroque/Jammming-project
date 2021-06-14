import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {searchResults:[{name:''},{artist:''},{album:''},{id:''}],
                  playlistName:'',
                  playlistTracks:[{name:''},{artist:''},{album:''},{id:''}]
                  };
    this.addTrack= this.addTrack.bind(this);
  }
  addTrack(track){
    if(!this.state.playlistTracks.id.includes(track.id)){
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks:[{name:track.name},{artist:track.artist},{album:track.album},{id:track.id}]});
    }

  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
            <SearchBar />
          <div className="App-playlist">
            {/*<!-- Add a SearchResults component -->*/}
              <SearchResults searchResults ={this.state.searchResults} onAdd={this.addTrack} />
            {/*<!-- Add a Playlist component -->*/}
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
    </div>
      );
  }
}

