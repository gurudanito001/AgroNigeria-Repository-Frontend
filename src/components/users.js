import React, { useEffect, useState, useContext } from 'react';
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
import { useHistory, Link, useParams, useLocation } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import EditUser from '../reusableComponents/editUser';
import UsersTable from '../reusableComponents/usersTable';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddNewUser from '../reusableComponents/addNewUser'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { MyContext } from '../store/index';

const useStyles = makeStyles((theme) => ({
    paper: {
        zIndex: 1,
        position: 'relative',
        paddingTop: 10
    }
}));

export default function Users() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [allUsers, setAllUsers] = React.useState([]);
    const [fetchingUsers, setFetchingUsers] = React.useState(false);
    const [deleteEmail, setDeleteEmail] = React.useState("");
    const [deleteId, setDeleteId] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [editedUser, setEditedUser] = React.useState({ })
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState("")

    const classes = useStyles()
    const userContext = useContext(MyContext)


    let loggedIn = userContext.auth.accessToken
    let history = useHistory();
    useEffect( ()=>{
        if(!loggedIn){
            return history.push("/login")
        }
    }, [loggedIn])

    useEffect(() => {
        fetchAllUsers()
        console.log("users has mounted")
    }, []);

    useEffect(() => {
        console.log(location.pathname)
        setCurrentPath(location.pathname)
        if(location.pathname === "/users"){
            fetchAllUsers()
        }
    }, [location.pathname]);

    function fetchAllUsers () {
        setFetchingUsers(true)
        axios.get(`${serverURL}/users`, {
            headers: {
                'Authorization': `Bearer ${userContext.auth.accessToken}`
            }
        })
        .then((res) => {
            if (res.data.success) {
                setAllUsers(res.data.data)
                setFetchingUsers(false)
            }
        })
        .catch((error) => {
            console.log(error.response.data.message)
            if(error.response.data.message.message === "jwt expired"){
                 userContext.refreshTokens(fetchAllUsers)
            }
            setFetchingUsers(false)
        });
    }

    function deleteUser(userId) {
        axios.delete(`${serverURL}/users/${userId}`)
            .then((res) => {
                if (res.data.success) {
                    setSuccessMessage(res.data.message)
                    setOpenDialog(false)
                    fetchAllUsers()
                }
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(error.response.data.message || error.response.data)
                /* this.setError("appError", error.response.data.message || error.response.data) */
                setFetchingUsers(false)
            });
    }


    return(
        <>
        {currentPath !== "/users" ?
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/users">
                    AllUsers
                </Link>
                <Typography color="textPrimary">{currentPath === "/users/new" ? "Add New" : "Edit User" }</Typography>
            </Breadcrumbs> : null
        }
            

            <Slide direction="right" in={currentPath === "/users"} mountOnEnter unmountOnExit>
                <Paper elevation={4} className={`${classes.paper}`}>
                    <UsersTable
                        openDialog={openDialog}
                        allUsers={allUsers}
                        fetchingUsers={fetchingUsers}
                        deleteEmail={deleteEmail}
                        deleteId={deleteId}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                        editedUser={editedUser}
                        deleteUser={deleteUser}
                        setDeleteEmail={setDeleteEmail}
                        setDeleteId={setDeleteId}
                        setEditedUser={setEditedUser}
                        setOpenDialog={setOpenDialog}
                    />
                </Paper>
            </Slide>

            <Slide direction="right" in={currentPath === "/users/new"} mountOnEnter unmountOnExit>
                <Paper elevation={4} className={`${classes.paper}`} >
                    <AddNewUser />
                </Paper>
            </Slide>

            <Slide direction="right" in={currentPath === "/users/edit"} mountOnEnter unmountOnExit>
                <Paper elevation={4} className={classes.paper}>
                    <EditUser 
                        user={editedUser}
                    />
                </Paper>
            </Slide>
        
        </>
    )
}