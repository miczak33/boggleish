import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

export default class Board extends Component {
  
  state = {
    board: {},
    wordInput: ''
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/api/boards/${this.props.match.params.boardId}`)
      .then(board => this.setState((prevState, props) => {
        return { board: board.data }
      }));
  }

  findWord = e => {
    axios.get(`http://localhost:3000/api/boards/${this.props.match.params.boardId}/find_input?input_text=${this.state.wordInput}`)
      .then(result => console.log(result.data));
  }

  handleInput = e => {
    console.log(e);
    this.setState({ wordInput: e.target.value });
  }

  render() {
    if (_.isEmpty(this.state.board)) return <div>LOADING...</div>
    return (
      <div className="container">
        <h3>{this.state.board.pretty_name}</h3>
        <div className="row">
          <div className="boggle-board clearfix">
            {this.state.board.arrangement.map(x => {
              return x.map(y => (
                <div className="square">
                  <div className="content">
                    <div className="boggle-piece">
                      <div className="boggle-piece-cell">
                        {y}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <input type="text" name="findWord" onChange={this.handleInput} value={this.state.wordInput} />
            <button name="submit" onClick={this.findWord}>Find Word</button>
          </div>
        </div>
      </div>
    )
  }
}