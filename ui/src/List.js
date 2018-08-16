import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class List extends Component {

  state = {
    boards: [],
    newBoardName: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/boards')
      .then(result => this.setState((prevState, props) => {
        return { boards: result.data}
      }));
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/boards', {
        board: {
          pretty_name: this.state.newBoardName
        }
      })
      .then(result => this.props.history.push(`/board/${result.data.id}`));
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleListClick = boardId => {
    this.props.history.push(`/board/${boardId}`);
  }

  render() {
    return (
      <div className="container">
        <div style={{ width:'500px', margin: '0 auto' }}>
          <div className="row" style={{ marginTop: '25px' }}>
            <div className="col-xs-12" style={{ paddingBottom: '15px' }}>
              <div className="col-xs-12 form-group">
                <form className="form-inline" onSubmit={this.handleCreateSubmit}>
                  <input type="text" className="form-control mb-2 mr-sm-2" onChange={this.handleInputChange} value={this.state.newBoardName} style={{ width: '300px', marginRight: '5px' }} name="newBoardName" placeholder="Custom Board Name" />
                  <button type="submit" className="btn btn-primary">Create New Board</button>
                </form>
              </div>
            </div>
          </div>
          <hr />
          <h3>Saved Boggle Boards</h3>
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
      </div>
    )
  }
}