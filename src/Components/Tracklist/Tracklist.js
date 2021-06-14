import React from 'react';
import './Tracklist.css';
import {Track} from '../Track/Track.js';

export class Tracklist extends React.Component{
    render() {
        return (
    <div className="TrackList">
    {/*<!-- You will add a map method that renders a set of Track components  -->*/}
             <Track track = {this.props.tracks.map(track=> track.id)} onAdd={this.props.onAdd}  />
    </div>
        );
    }
}