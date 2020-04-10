import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'actions'
import store from 'store'
import {
  Link
} from "react-router-dom";
import { SHOW_BOOTSTRAP_REDUX_MODAL } from 'components/BootstrapReduxModal/actions'
import 'react-dates/initialize';


class Users extends Component {

  state = {
    
  }

  dataTableState = {
    currentPage: 1,
    rowsPerPage: 10,
    sorting: "",
    sortingOrder: ""
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.users.types.ALL});
  }

  ActionsCells = (obj) => {
    return (
      <div >
        <Link className="btn btn-success" to={"/users/" +obj.id}>Show</Link>
        <Link className="btn btn-warning" to={"/users/" +obj.id+ "/edit"}>Edit</Link>
        <Button className="btn btn-danger" onClick={() => {this.deleteUserModal(obj.id)}}>Delete</Button>
      </div>
    )
  }
  columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true
    },
    {
      name: 'email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      sortable: true
    },
    {
      name: 'Last Name',
      selector: 'last_name',
      sortable: true
    },
    {
      name: 'Actions',
      selector: 'last_name',
      sortable: false,
      minWidth: '220px',
      cell: this.ActionsCells
    },
  ];


  deleteUserModal = (id) => {
    let modalConfig = {
      hidden: false,
      color: "danger",
      description: "Are you sure you want to delete this user ?",
      currentActionType: actions.users.types.DELETE,
      currentActionparams: {id: id, updateCollection: true}
    }
    store.dispatch({ type: SHOW_BOOTSTRAP_REDUX_MODAL , payload: modalConfig  })
  }

  onChangeRowsPerPage = (rowsPerPage ) => {
    
    this.dataTableState.rowsPerPage = rowsPerPage
    this.refresh()
  }

  onChangePage = (page, totalRows) => {
    this.dataTableState.currentPage = page
    this.refresh()
  }

  onSort = (column, sortDirection, event) => {
    console.log(column)

    this.dataTableState.sorting = column.selector + ""
    this.dataTableState.sortingOrder = sortDirection + ""
    this.refresh()
  }

  refresh = () => {
    console.log("refreshing data")
    console.log(this.dataTableState)
    let body = {}
    body.page = this.dataTableState.currentPage
    body.items = this.dataTableState.rowsPerPage
    if(this.dataTableState.sorting != ""){
      body.q = {}
      body.q.s = this.dataTableState.sorting + " " + this.dataTableState.sortingOrder
    }
    store.dispatch({type: actions.users.types.ALL, payload: body});
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Users</h2>
            </div>
            <div className="col-md-4 float-right">
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div id="times-entries-parent-holder">

            <DataTable
              title=""
              columns={this.columns}
              data={this.props.users.users}
              sortServer={true}
              onSort={this.onSort}
              pagination={true}
              paginationServer={true}
              responsive = {true}
              paginationRowsPerPageOptions = {[5,10,15,20,25,50,100,200]}
              paginationTotalRows={this.props.users.pagination.count}
              onChangeRowsPerPage={this.onChangeRowsPerPage}
              onChangePage={this.onChangePage}
              onSort={this.onSort}
            />
          </div>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile, users: state.users}
}
export default withRouter(connect(mapStateToProps)(Users));
