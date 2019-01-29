import React, { Component } from 'react';
// import GridLayout from 'react-grid-layout';
import {Container, Row, Col} from 'react-amazing-grid'


export default class Projects extends Component {
  render() {
    return (<>
      <h1> Projects </h1>
      <div>
      	<Container> {
      		[1,2,3].map((rowN, x) => 
      			<Row>{
      				[1,2,3].map((colN, y) => 
      					<Col xs={3} onClick={() => this.props.openProject(rowN + ", " + colN)}><div style={{"background":"red"}}>{ rowN + ", " + colN }</div></Col>
      				)
      			}</Row>
      		)
      	}</Container>
      </div>
    </>)
  }
}