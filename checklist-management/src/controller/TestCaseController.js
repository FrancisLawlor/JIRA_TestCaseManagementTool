import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var products = [{
    id: 1,
    name: "Item name 1",
    price: 100
},{
    id: 2,
    name: "Item name 2",
    price: 100
}];
// It's a data format example.
function priceFormatter(cell, row){
return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

class TestCaseList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : null}
        

    }

    render() {
        // if (this.state.data == null) {
        //     return "loading..."
        // }

        // return <ul>
        // {/* {
        //     this.state.data.map((epic) => {
        //         return <li onClick={() => this.props.callback(epic.id)}>{epic.key} {epic.fields.summary}</li>
        //     })
        // } */}
        // </ul>

        return (
            <BootstrapTable data={products} striped={true} hover={true}>
                <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                <TableHeaderColumn dataField="Status" dataFormat={priceFormatter}>Status</TableHeaderColumn>
                <TableHeaderColumn dataField="Comment" dataFormat={priceFormatter}>Comment</TableHeaderColumn>
            </BootstrapTable>
	        // document.getElementById("app")
        )
    }

    componentDidMount() {
        // fetch('http://localhost:8080/epics/' + this.props.project)
        //     .then(response => response.json())
        //     .then(data => this.setState({data}));

    }
}

export default TestCaseList;