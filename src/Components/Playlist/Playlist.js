import React from 'react';
import {Tracklist} from '';
import './Playlist.css';

export class Playlist extends React.Component{
    render(){
        return(
        <div className="Playlist">
            <input defaultValue={'New Playlist'}/>
            {/*<!-- Add a TrackList component -->*/}
            <Tracklist tracks = {this.props.playlistTracks} />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
        );
    }
}