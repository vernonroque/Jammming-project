import React from 'react';
import {Tracklist} from '../Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component{
    render(){
        return(
        <div className="Playlist">
            <input defaultValue={'New Playlist'}/>
            {/*<!-- Add a TrackList component -->*/}
            <Tracklist tracks = {this.props.playlistTracks} onRemove= {this.props.removeTrack} isRemoval={true}/>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
        );
    }
}