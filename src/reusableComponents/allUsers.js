import React, { useEffect } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionText: {
      fontSize: "13px"
  }
});


export default function AllUsers() {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [allUsers, setAllUsers] = React.useState([])
  const [fetchingUsers, setFetchingUsers] = React.useState(false)
  const [deleteEmail, setDeleteEmail] = React.useState("")
  const classes = useStyles()

  function fetchAllUsers() {
    setFetchingUsers(true)
    axios.get(`${serverURL}/users`)
      .then((res) => {
        if (res.data.success) {
          setAllUsers(res.data.data)
          setFetchingUsers(false)
        }
      })
      .catch((error) => {
        console.log(error)
        /* this.setError("appError", error.response.data.message || error.response.data) */
        setFetchingUsers(false)
      }); 
  }

  useEffect(() => {
    fetchAllUsers()
  }, [] );


  return (
    <div className="px-3 px-lg-0 mt-3 mt-lg-0">
      <header className="d-flex align-items-center mb-3">
          <h3 className="d-inline mr-2 m-0 p-0">Users</h3>
          <Link to="/users/new" className="text-decoration-none">
          <Button variant="outlined" color="primary" size="small">
                Add New 
          </Button>
          </Link>
          <div className={`spinner-border text-primary ml-auto ${fetchingUsers ? "": "d-none"}`} role="status">
            <span className="sr-only">Loading...</span>
          </div>
      </header>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
            {allUsers.map(user =>{
              return(
                <TableRow key={user._id}>
                  <TableCell align="left">{user.firstName}</TableCell>
                  <TableCell align="left">{user.lastName}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">user Role </TableCell>
                  <TableCell align="left" className={classes.actionText}>
                    <Link to="" className="pr-1 text-primary"> Edit </Link>
                    <a href="#" className="pr-1 text-danger" onClick={()=>{
                      setOpenDialog(true)
                      setDeleteEmail(user.email)
                      }}> Delete </a>
                    <Link to={`users/view/${user._id}`} className="pr-1 text-secondary"> View </Link>
                  </TableCell>
                </TableRow>
              )})
            }
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog 
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog}
        email={deleteEmail}/>
      </div>
  )
}