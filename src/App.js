import React, { Component } from "react";
import "./App.css";
import MovieBox from "./components/MovieBox.js";
import $ from "jquery";
import { Button } from 'reactstrap';
import magnifying_glass from './magnifying_glass.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayAll();
  }
  displayAll() {
    const urlString =
      "https://api.themoviedb.org/3/discover/movie?api_key=40c4aa46310b723fa9400363a0f2893c";

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch data success");
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          // console.log(movie.poster_path);
          const movieBox = <MovieBox key={movie.id} movie={movie} />;
          movieBoxes.push(movieBox);
        });
        this.setState({ rows: movieBoxes });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=40c4aa46310b723fa9400363a0f2893c&query=" +
      searchTerm;

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch data success");
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          //console.log(movie.poster_path);
          const movieBox = <MovieBox key={movie.id} movie={movie} />;
          movieBoxes.push(movieBox);
        });
        this.setState({ rows: movieBoxes });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  searchChangeHandler(event) {
    //console.log(event.target.value);
    const searchTerm = event.target.value;
    if (searchTerm.trim() === "") {
      //console.log("empty here");
      this.displayAll();
    } else {
      this.performSearch(searchTerm);
    }
  }
  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>&nbsp;&nbsp;All Movies</td>
            </tr>
          </tbody>
        </table>
        <table style={{
          background: "white",
          fontSize: 24,
          display: "block",
          width: "100%",
          paddingTop: 8,
          paddingBottom: 8
        }}>
        <tr>
        <td >&nbsp;<img src={magnifying_glass} alt="magnifying_glass" /></td>
        <td>
        <input
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Enter search term" />
        </td>
        </tr>
        </table><br/>
        <div className="button-div">
              <Button color="primary">POPULAR</Button>{' '}
              <Button color="secondary">TOP RATED</Button>{' '}
              <Button color="success">UPCOMING</Button>{' '}
              <Button color="info">NOW PLAYING</Button>{' '}
        </div>
        <div
          style={{
            position: "relative",
            maxHeight: "550px",
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default App;
