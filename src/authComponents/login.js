import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import Logo from '../images/agronigeriaLogo.png';
import '../App.css';
import { MyContext } from '../store/index';

const useStyles = makeStyles((theme) =>({
    loginCard: {
        minWidth: 330,
        maxWidth: 350,
        padding: '15px 0px 15px 0px'
    },
    margin: {
        margin: theme.spacing(0),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
        marginBottom: '15px',
    },
    noMarginBottom: {
        marginBottom: '0px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    btn: {
        marginLeft: "8px",
        marginRight: "8px",
        width: "100%"
    },
    rememberMe: {
        width: "100%",
    },
    border: {
        border: "2px solid red"
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[900]),
        backgroundColor: blue[900],
        '&:hover': {
            backgroundColor: blue[900],
        },
    },
}))(Button);

const BlueCheckbox = withStyles({
    root: {
        color: blue[900],
        '&$checked': {
            color: blue[900],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function Login() {

    const userContext = useContext(MyContext)
    let loggedIn = userContext.user.loggedIn
    let history = useHistory();
    useEffect( ()=>{
        //console.log(loggedIn)
        if(loggedIn){
            return history.push("/")
        }
    }, [loggedIn])


    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false
    }); 

    const [error, setError] = React.useState("");
    const showStateValues = ()=>{
        console.log(values)
    }
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleCheckbox = () =>{
        setValues({ ...values, rememberMe: !values.rememberMe})
    }
 
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    if(loggedIn){
        return null
    }
    return (
        <div className="App">
            {userContext.errors.login ?
            <Alert severity="error">{userContext.errors.login}</Alert>
            : null 
            }

            <header>
                <img src={Logo} className="img img-fluid"/>
            </header>
            
            <Card className={classes.loginCard} variant="outlined">
                <CardContent>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"> 
                        <InputLabel htmlFor="loginEmail">Email</InputLabel> 
                        <OutlinedInput 
                            required
                            id="loginEmail" 
                            type="text"
                            value={values.email}
                            className={classes.margin} 
                            variant="outlined" 
                            onChange={handleChange('email')}
                            labelWidth={40}
                        />
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.textField, classes.noMarginBottom)} variant="outlined"> 

                        <InputLabel htmlFor="loginPassword">Password</InputLabel> 
                        <OutlinedInput
                            required
                            id="loginPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            variant="outlined" 
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    <FormControl component="fieldset" className={classes.rememberMe}>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={<BlueCheckbox name="checkedG" />}
                                checked={values.rememberMe}
                                label="Remember Me"
                                value="rememberMe"
                                labelPlacement="end"
                                onChange={handleCheckbox}
                            />
                        </FormGroup>
                    </FormControl>
                </CardContent>

                <CardActions>
                    <FormControl className={clsx(classes.btn)} variant="outlined"> 
                    <ColorButton variant="contained" color="primary" size="large" className={classes.margin} 
                        onClick={()=>{
                            userContext.clearMessages()
                            userContext.authenticate(values.email, values.password)
                        }}
                    >
                        Login
                    </ColorButton>
                    </FormControl>
                </CardActions>

                
            </Card>
            <Typography className="text-left px-3 mt-3" gutterBottom>
                <Link to="/forgotPassword" className="text-white">
                    Forgot Password
                </Link>
            </Typography>
        </div>
    );
}