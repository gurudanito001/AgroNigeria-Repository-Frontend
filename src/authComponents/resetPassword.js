import React, { useContext, useEffect } from 'react';
import { useHistory, Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
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

export default function ResetPassword() {

    const userContext = useContext(MyContext)
    let loggedIn = userContext.user.loggedIn
    let history = useHistory();
    let { resetLink } = useParams();
    useEffect( ()=>{
        if(loggedIn){
            return history.push("/")
        }
    }, [loggedIn])


    const classes = useStyles();
    const [values, setValues] = React.useState({
        resetLink: resetLink,
        password1: '',
        password2: '',
        showPassword1: false,
        showPassword2: false
    }); 
    const { password1, password2 } = values
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
 
    const handleClickShowPassword1 = () => {
        setValues({ ...values, showPassword1: !values.showPassword1 });
    };
    const handleClickShowPassword2 = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 });
    };

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };
    if(loggedIn){
        return null
    }
    return (
        <div className="App">
            {userContext.errors.resetPassword ?
            <Alert severity="error">{userContext.errors.resetPassword}</Alert>
            : null 
            }
            {userContext.success.resetPassword ?
            <Alert severity="success">{userContext.success.resetPassword}</Alert>
            : null 
            }



            <header>
                <img src={Logo} className="img img-fluid"/>
            </header>
            
            <Card className={classes.loginCard} variant="outlined">
                <CardContent>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"> 

                        <InputLabel htmlFor="password">Password</InputLabel> 
                        <OutlinedInput
                            required
                            id="password"
                            type={values.showPassword1 ? 'text' : 'password'}
                            value={values.password1}
                            variant="outlined" 
                            onChange={handleChange('password1')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword1}
                                    edge="end"
                                    >
                                    {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.textField, classes.noMarginBottom)} variant="outlined"> 

                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel> 
                        <OutlinedInput
                            required
                            id="confirmPassword"
                            type={values.showPassword2 ? 'text' : 'password'}
                            value={values.password2}
                            variant="outlined" 
                            onChange={handleChange('password2')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword2}
                                    edge="end"
                                    >
                                    {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={135}
                        />
                    </FormControl>
                </CardContent>

                <CardActions>
                    <FormControl className={clsx(classes.btn)} variant="outlined"> 
                        <ColorButton variant="contained" color="primary" size="large" className={classes.margin} 
                            onClick={()=>{
                                userContext.clearMessages()
                                userContext.resetPassword(resetLink, password1, password2)
                            }}
                        >
                            Reset Password
                        </ColorButton>
                    </FormControl>
                </CardActions>

            </Card>
            <Typography className="text-left px-3 mt-3" gutterBottom>
                <Link to="/login" className="text-white">
                    <ArrowBackOutlinedIcon fontSize="small" /> Login
                </Link>
            </Typography>
        </div>
    );
}