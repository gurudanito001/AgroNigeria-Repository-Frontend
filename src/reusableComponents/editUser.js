import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {serverURL} from '../config';
import PersistentNavigation from '../reusableComponents/persistentNavigation';
import DrawerNavigation from '../reusableComponents/drawerNavigation';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import '../App.css';
import { MyContext } from '../store/';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  form: {
    minWidth: 330,
    maxWidth: 400,
  },
  margin: {
    margin: theme.spacing(0),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    marginBottom: '15px'
  },
  submitBtn: {
    marginTop: '15px'
  }
}));


export default function EditUser( props ) {
  const userContext = useContext(MyContext)
  const classes = useStyles();
  const [state, setState] = React.useState({
    id: props.user.id,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    email: props.user.email,
    role: props.user.role ? props.user.role : "",
  });
  const [errorMessage, setErrorMessage] = React.useState("")
  const [successMessage, setSuccessMessage] = React.useState("")
    
    const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const updateUser = ()=>{
        axios.put(`${serverURL}/users/${state.id}`, state)
        .then((res) => {
            if (res.data.success) {
                setSuccessMessage(res.data.message)
                console.log( res )
            }
        })
        .catch((error) => {
            setErrorMessage(error.response.data.message || error.response.data)
            console.log(error)
        });
    }

    /* const handleClickShowPassword = (prop) => {
        console.log(prop)
        setState({ ...state, [prop]: !state[prop] });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; */

  return (
    <div className={`${classes.form} px-3 py-3`}>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

      <header className="d-flex align-items-center mb-3 mt-3 mt-md-0">
        <h3 className="d-inline mr-2 m-0 p-0">Edit User</h3>
      </header>
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"> 
        <TextField label="Firstname" size="small" variant="outlined" value={state.firstName} onChange={handleChange("firstName")} />
      </FormControl>

      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"> 
        <TextField  label="Lastname" size="small" variant="outlined" value={state.lastName}  onChange={handleChange("lastName")} />
      </FormControl>

      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"> 
          <TextField label="Email" size="small" variant="outlined" value={state.email} onChange={handleChange("email")} />
      </FormControl>

      <FormControl variant="outlined" className={clsx(classes.margin, classes.textField)} margin='dense'>
        
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          value={state.role}
          className={clsx(classes.margin, classes.root1)}
          onChange={handleChange("role")}
          input={<OutlinedInput classes={{ input: classes.input1 }} label="Role" />}
        >
          <MenuItem value="" selected> <em>Role</em></MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
        </Select>
      </FormControl>

      {/* <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"  margin='dense'> 
          <InputLabel htmlFor="newUserPassword1">Password</InputLabel> 
          <OutlinedInput
              size="small"
              required
              type={state.showPassword1 ? 'text' : 'password'}
              value={state.password1}
              variant="outlined" 
              onChange={handleChange('password1')}
              endAdornment={
                  <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>{handleClickShowPassword('showPassword1')}}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
              }
              labelWidth={70}
          />
      </FormControl> */}
 
      {/* <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" margin='dense'> 

          <InputLabel htmlFor="newUserPassword2">Confirm Password</InputLabel> 
          <OutlinedInput
              size="small"
              required
              type={state.showPassword2 ? 'text' : 'password'}
              value={state.password2}
              variant="outlined" 
              onChange={handleChange('password2')}
              endAdornment={
                  <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>{handleClickShowPassword('showPassword2')}}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {state.showPassword2 ? <Visibility size="small"/> : <VisibilityOff size="small"/>}
                      </IconButton>
                  </InputAdornment>
              }
              labelWidth={135}
          />
      </FormControl> */}

      <Button variant="contained" size="large" color="primary" className={classes.submitBtn} 
        onClick={()=>{
          console.log(state)
          updateUser(state)
        }}
      >
          Update User Info
      </Button>
    </div>
  );
}
