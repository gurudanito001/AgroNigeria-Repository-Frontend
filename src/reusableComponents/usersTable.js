import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {serverURL} from '../config';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory, Link, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from './dialog';
import Alert from '@material-ui/lab/Alert';
import EditUser from './editUser';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 650,
    maxWidth: 800
  },
  actionText: {
      fontSize: "13px"
  }
}));

const UsersTable = (props) =>{

  /* const [openDialog, setOpenDialog] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [fetchingUsers, setFetchingUsers] = React.useState(false);
  const [deleteEmail, setDeleteEmail] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [editedUser, setEditedUser] = React.useState({ });
  const location = useLocation(); */

  const classes = useStyles()

  return (
    <div className={`px-lg-0 mt-3`}>
      
      {props.errorMessage ? <Alert severity="error">{props.errorMessage}</Alert> : null}  
      {props.successMessage ? <Alert severity="success">{props.successMessage}</Alert> : null}
      <header className="d-flex align-items-center my-3 px-3">
          <h3 className="d-inline mr-2 m-0 p-0">Users</h3>
          <Link to="/users/new" className="text-decoration-none">
          <Button variant="outlined" color="primary" size="small">
              Add New 
          </Button>
          </Link>
          <div className={`spinner-border spinner-border-sm text-primary ml-auto ${props.fetchingUsers ? "": "d-none"}`} role="status">
            <span className="sr-only">Loading...</span>
          </div>
      </header>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Firstname</TableCell>
              <TableCell align="left">Lastname</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allUsers.map(user => {
              return (
                <TableRow key={user._id}>
                  <TableCell align="left">{user.firstName}</TableCell>
                  <TableCell align="left">{user.lastName}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left" className={classes.actionText}>
                    <Link to="/users/edit" className="btn btn-link btn-sm text-primary py-0 px-1" onClick={() => {
                      props.setEditedUser({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role
                      })
                    }}> Edit </Link>

                    <button className="btn btn-link btn-sm text-danger py-0 px-1" onClick={() => {
                      props.setOpenDialog(true)
                      props.setDeleteEmail(user.email)
                      props.setDeleteId(user._id)
                    }}> Delete </button>
                    {/* <Link to={`users/view/${user._id}`} className="pr-1 text-secondary"> View</Link> */}
                  </TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
            
      <Dialog 
      openDialog={props.openDialog} 
      setOpenDialog={props.setOpenDialog}
      email={props.deleteEmail}
      deleteUser={()=>{props.deleteUser(props.deleteId)}}/> 
    </div>
  )
}

export default UsersTable