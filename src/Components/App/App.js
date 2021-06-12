import logo from './logo.svg';
import './App.css';
import React from 'react';
import {SearchBar} from './SearchBar/SearchBar.js';
import {SearchResults} from './SearchResults/SearchResults.js';
import {Playlist} from './Playlist/Playlist.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            
              <form className ="Search_Bar">
                <input type = "text" placeholder="Enter a song title" name="search" />
                <button type="submit">Submit</button> 
                
              </form>
            <div className="App-playlist">
  
              <div className="Search_Results">

              </div>
             
              <div className="Playlist">

              </div>
            </div>
        </div>
      </div>
    </div>



  );
}




export default App;
