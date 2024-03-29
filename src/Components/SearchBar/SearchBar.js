import React from 'react';
import"./SearchBar.css";

export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange= this.handleTermChange.bind(this);
    }
    search() {
        this.props.onSearch(this.state.searchTerm);
    }
    handleTermChange(event){
        const term = event.target.value;
        this.setState({searchTerm:term});
        
    }

    render(){
        return(
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
        )
    }
}
