import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn, ExportCSVButton, InsertModalFooter} from 'react-bootstrap-table';

function priceFormatter(cell, row){
return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

var selectRowProp = {
   mode: "checkbox",
   clickToSelect: true,
   bgColor: "rgb(238, 193, 213)"
 };

 const cellEditProp = {
   mode: 'click'
 };


function onAfterInsertRow(row) {
    console.log(row)

    let status = parseInt("1")
    fetch('http://localhost:8080/testcases', {
       method: 'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
            "name": row.name,
            "description": row.description,
            "comment": row.comment,
            "status": 1,
            "epicId": 25575
        })
    });

    // return row
}




class TestCaseList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : null}
        

    }

    handleExportToJiraClick = (onClick) => {
         console.log("here")
        onClick()
    }
    createCustomJiraButton = (onClick) => {
        return (
            <ExportCSVButton
                btnText = "Export to Jira"
                onClick = {() => this.handleExportToJiraClick(onClick)} />
            );
     }

     handleSave(save){
        // const { columns, onSave } = this.props;
        // const newRow = {};
        // columns.forEach((column, i) => {
        //     newRow[column.field] = this.refs[column.field].value;
        // }, this);
        // console.log(newRow)
        // You should call onSave function and give the new row
        // onSave(newRow)

        // var name = document.getElementById('name').value
        // var desc = document.getElementById('desc').value
        // // var status = document.getElementById('status').value
        // var comment = document.getElementById('comment').value
        // console.log(inputs)



        save()
     }

createCustomModalFooter = (closeModal, save) => {
 // return (
   // <InsertModalFooter
   //   className='my-custom-class'
   //   saveBtnText='CustomSaveText'
   //   closeBtnText='CustomCloseText'
   //   closeBtnContextual='btn-warning'
   //   saveBtnContextual='btn-success'
   //   closeBtnClass='my-close-btn-class'
   //   saveBtnClass='my-save-btn-class'
   //   beforeClose={ this.beforeClose }
   //   beforeSave={ this.beforeSave }
   //   onModalClose={ () => this.handleModalClose(closeModal) }
   //   onSave={ () => this.handleSave(save) }/>
 // );

 // If you want have more power to custom the child of InsertModalFooter,
 // you can do it like following
 return (
   <InsertModalFooter
     onSave={ () => this.handleSave(save) }>
     {/*{ ... }*/}
   </InsertModalFooter>
 );
}
//...



    submit() {
        fetch('http://localhost:8080/comments/GLOB-110', {
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body:
            "{'body':'http://localhost:8080/testcases/epic/25575'}"
        });
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

     const options = {
        // exportCSVButton : this.createCustomJiraButton
 insertModalFooter: this.createCustomModalFooter,
 afterInsertRow: onAfterInsertRow

     };


        var data

        if (this.state.data === null) {
            data = []
        } else {
            data = this.state.data.map((task) => {
                return {
                    name : task.name,
                    description : task.description,
                    comment: task.comment,
                    status: (task.status == 1) ? "passing" : "failing"
                }
            })
        }

        console.log(data)

        return (
            <div className="table-div">
               <BootstrapTable
               data={data}
               options={options}
               selectRow={selectRowProp}
               cellEdit={ cellEditProp }
               insertRow deleteRow exportCSV
               striped
               hover
               condensed
               pagination
               insertRow
               deleteRow
               search
               >
                   <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                   <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                   <TableHeaderColumn dataField="status" dataSort={true}>Status</TableHeaderColumn>
                   <TableHeaderColumn dataField="comment" dataSort={true} >Comment</TableHeaderColumn>
               </BootstrapTable>
               {/*<div>
                <input id='name'/>
                <input id='desc'/>
                <input id='status'/>
                <input id='comment'/>
               </div>*/}
           <button onClick={this.submit}> Send to Jira </button>
           </div>

        )
    }

//         if (this.state.data == null) {
//             return "loading..."
//         }
// 
//         // console.log(this.state.data)
//         // console.log(this.state.data._embedded.testCaseList)
//         return <div>
//         <ul>
//         {
//             this.state.data.map((task) => {
//                 return  <li>{task.name}</li>
//             })
//         }
//         </ul>

//         </div>
//     }
// 
    componentDidMount() {
        console.log(this.props.epic)
        fetch('http://localhost:8080/testcases/epic/' + this.props.epic)
            .then(response => response.json())
            .then(response => {

                console.log(response)
                if (!("_embedded" in response)){
                    return []
                } else {
    return response._embedded.testCaseList
                
                }
            })
            .then(data => this.setState({data}));
    }
}

export default TestCaseList;
