import React from 'react';
import './Track.css';


export class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }
    renderAction(){
        let isRemoval = this.props.isRemoval;
        if(isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        }
        else if(!isRemoval){
            return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }
    addTrack(){
        const newTrack = this.props.track;
        this.props.onAdd(newTrack);
    }
    removeTrack(){
        const removedTrack= this.props.track;
        this.props.onRemove(removedTrack); 
    }
    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name} </h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <audio className="Audio-Controls" src={this.props.track.preview} controls>Audio Not Available</audio>
                </div>
                {this.renderAction()}
                
            </div>
        );
    }
}