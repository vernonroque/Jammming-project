import React from 'react';
import {Tracklist} from '../Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event){
        const playlistName = event.target.defaultValue;
        this.setState({playlistName:playlistName});
    }
    render(){
        return(
        <div className="Playlist">
            <input onChange={this.handleNameChange} defaultValue={'Enter Playlist Name'}/>
            {/*<!-- Add a TrackList component -->*/}
            <Tracklist tracks = {this.props.playlistTracks} onRemove= {this.props.removeTrack} isRemoval={true}/>
            <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
        );
    }
}