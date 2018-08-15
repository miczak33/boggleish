import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class List extends Component {

  state = {
    boards: []
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/boards')
      .then(result => this.setState((prevState, props) => {
        return { boards: result.data}
      }));
  }

  handleListClick = boardId => {
    console.log(boardId);
  }

  render() {
    return (
      <div className="container">
        <h2>Saved Boggle Boards</h2>
        <div className="row">
          <div className="col-xs-12">
            <ListGroup>
            {this.state.boards.map(x => (
              <ListGroupItem onClick={() => this.handleListClick(x.id)} key={x.id}>{x.pretty_name}</ListGroupItem>
            ))}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}