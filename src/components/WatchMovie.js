import React, { Component } from "react";
class WatchMovie extends Component {
  state = {};
  handleRemove(event) {
    const id = event.target.id;
    this.removeFromWatchList(id);
  }
  removeFromWatchList(id) {
    console.log("remove from watch list: " + id);
  }
  render() {
    return (
      <div
        key={this.props.movie.id}
        style={{
          width: 250,
          height: 400,
          paddingTop: 5,
          color: "white",
          float: "left"
        }}
      >
        <img alt="poster" src={this.props.movie.poster} />
        <br />
        {this.props.movie.title}
        <br />
        <button id={this.props.movie.id} onClick={this.handleRemove.bind(this)}>
          Remove
        </button>
      </div>
    );
  }
}

export default WatchMovie;
