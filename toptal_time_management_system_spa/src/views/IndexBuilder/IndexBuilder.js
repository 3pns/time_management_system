import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
} from 'reactstrap';
import store from 'store'
import DataTable from 'react-data-table-component';
import { SHOW_BOOTSTRAP_REDUX_MODAL } from 'components/BootstrapReduxModal/actions'

class IndexBuilder extends Component {

  dataTableState = {
    currentPage: 1,
    rowsPerPage: 10,
    sorting: "",
    sortingOrder: ""
  }

  ActionsCells = (obj) => {
    return (
      <div >
        <Link className="btn btn-info" to={this.props.resourceBasePath + '/' + +obj.id}>View</Link>
        <Link className="btn btn-warning" to={this.props.resourceBasePath + '/'  +obj.id+ "/edit"}>Edit</Link>
        <Button className="btn btn-danger" onClick={() => {this.deleteUserModal(obj.id)}}>Delete</Button>
      </div>
    )
  }

  onSort = (column, sortDirection, event) => {
    this.dataTableState.sorting = column.selector + ""
    this.dataTableState.sortingOrder = sortDirection + ""
    this.refresh()
  }

  onChangeRowsPerPage = (rowsPerPage ) => {
    this.dataTableState.rowsPerPage = rowsPerPage
    this.refresh()
  }

  onChangePage = (page, totalRows) => {
    this.dataTableState.currentPage = page
    this.refresh()
  }

  refresh = () => {
    console.log(this.dataTableState)
    let body = {}
    body.page = this.dataTableState.currentPage
    body.items = this.dataTableState.rowsPerPage
    if(this.dataTableState.sorting != ""){
      body.q = {}
      body.q.s = this.dataTableState.sorting + " " + this.dataTableState.sortingOrder
    }
    this.props.onRefresh(body)
  }

  deleteUserModal = (id) => {
    let modalConfig = {
      hidden: false,
      color: "danger",
      description: "Are you sure you want to delete this item ?",
      currentActionType: this.props.deleteAction,
      currentActionparams: {id: id, updateCollection: true}
    }
    store.dispatch({ type: SHOW_BOOTSTRAP_REDUX_MODAL , payload: modalConfig  })
  }

  render() {
    let columns = this.props.columns
    columns.push({
      name: 'Actions',
      selector: 'last_name',
      sortable: false,
      minWidth: '220px',
      cell: this.ActionsCells
    })
    return (  
      <DataTable
        title=""
        columns={this.props.columns}
        data={this.props.data}
        sortServer={true}
        onSort={this.onSort}
        pagination={true}
        paginationServer={true}
        responsive = {true}
        paginationRowsPerPageOptions = {[5,10,15,20,25,50,100,200]}
        paginationTotalRows={this.props.pagination.count}
        onChangeRowsPerPage={this.onChangeRowsPerPage}
        onChangePage={this.onChangePage}
        onSort={this.onSort}
      />
    )
  }
}

export default IndexBuilder
