import React from 'react';
import './Tracklist.css';
import {Track} from '../Track/Track.js';

export class Tracklist extends React.Component{
  
   /* mapMethod(){
       if(this.props.track){
        return this.props.track.map(track =>  {
            return(
                /*<div className="TrackList">
                    <Track
                    key ={track.id}
                    onAdd={this.props.onAdd} 
                    isRemoval={this.props.isRemoval} 
                  onRemove={this.props.removeTrack} 
                  
                   />
                </div>
            this.props.tracks.map(track =>{
                    return <Track track={track} key ={track.id}/>
                    })
                
            )

        }); 

       }
    } */
    render() {
        return (
    <div className="TrackList">
    {/*<!-- You will add a map method that renders a set of Track components  -->*/}
            {this.props.tracks.map(track =>{
                console.log('This is the track preview url: ' + track.preview);
                return <Track track={track} key={track.id} 
                    onAdd={this.props.onAdd} 
                    isRemoval={this.props.isRemoval} 
                    onRemove={this.props.onRemove}
                    />
                })
            }
            
    </div>
        );
    }
}