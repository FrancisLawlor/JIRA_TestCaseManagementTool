import React, { Component } from 'react';
import {Container, Row, Col} from 'react-amazing-grid'

export default class Epics extends Component {
  render() {
    return (<>
      <h1> Epics {this.props.project} </h1>
      <div>
      	<Container> {
      		[1,2,3].map((rowN, x) => 
      			<Row>{
      				[1,2,3].map((colN, y) => 
      					<Col xs={3} onClick={() => this.props.openPopup(rowN+ ", " + colN)}><div style={{"background":"green"}}>{ rowN + ", " + colN }</div></Col>
      				)
      			}</Row>
      		)
      	}</Container>
      </div>
      <button onClick={this.props.closeEpics}> go back </button>
    </>)
  }
}