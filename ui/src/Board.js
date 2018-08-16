import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';

export default class Board extends Component {
  
  state = {
    board: {},
    wordInput: '',
    wordFound: null,
    isActualWord: false
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/api/boards/${this.props.match.params.boardId}`)
      .then(board => this.setState((prevState, props) => {
        return { board: board.data }
      }));
  }

  findWord = e => {
    e.preventDefault();
    axios.get(`http://localhost:3000/api/boards/${this.props.match.params.boardId}/find_input?input_text=${this.state.wordInput}`)
      .then(result => this.setState({ wordFound: result.data.found, isActualWord: result.data.isWord }));
  }

  handleInput = e => {
    this.setState({ wordInput: e.target.value.toUpperCase(), wordFound: null });
  }

  render() {
    if (_.isEmpty(this.state.board)) return <div>LOADING...</div>
    return (
      <div className="container">
        <div className="relative" style={{ width:'500px', margin: '0 auto' }}>
          <Link to="/" style={{ position: 'absolute', left: '0', top: '5px' }}>
            <i className="fas fa-long-arrow-alt-left" />
            <span style={{ marginLeft:'5px' }}>Back</span>
          </Link>
          <h3>{this.state.board.pretty_name}</h3>
        </div>
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
        <div className="row" style={{ marginTop: '15px' }}>
          <div className="col-xs-12 form-group">
            <form className="form-inline" onSubmit={this.findWord}>
              <input type="text" className="form-control mb-2 mr-sm-2" onChange={this.handleInput} value={this.state.wordInput} style={{ width: '350px', marginRight: '5px' }} id="inlineFormInputName2" placeholder="Enter Word" />
              <button type="submit" className="btn btn-primary">Find Word</button>
            </form>
          </div>
        </div>
        <div style={{ width: '500px', margin: '0 auto' }}>
          {(this.state.wordFound === true && this.state.isActualWord) &&
            <Alert bsStyle="success">
              The word <strong>{this.state.wordInput}</strong> was found on the board.
            </Alert>
          }
          {this.state.wordFound === false &&
            <Alert bsStyle="danger">
              <strong>Word Not Found.</strong> The word <strong>{this.state.wordInput}</strong> was not found on the board.
            </Alert>
          }
          {(this.state.wordFound === true && !this.state.isActualWord) &&
            <Alert bsStyle="danger">
              <strong>Not a Real Word.</strong> The word <strong>{this.state.wordInput}</strong> was found on the board but was not an actual word.
            </Alert>
          }
        </div>
        
      </div>
    )
  }
}