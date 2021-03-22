import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
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

export default function ForgotPassword() {

    const userContext = useContext(MyContext)
    let loggedIn = userContext.auth.accessToken
    let history = useHistory();
    useEffect( ()=>{
        if(loggedIn){
            return history.push("/")
        }
    }, [loggedIn])


    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: ''
    }); 
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    if(loggedIn){
        return null
    }
    return (
        <div className="App">
            {userContext.errors.forgotPassword ?
            <Alert severity="error">{userContext.errors.forgotPassword}</Alert>
            : null 
            }
            {userContext.success.forgotPassword ?
            <Alert severity="success">{userContext.success.forgotPassword}</Alert>
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
                </CardContent>

                <CardActions>
                    <FormControl className={clsx(classes.btn)} variant="outlined"> 
                    <ColorButton variant="contained" color="primary" size="large" className={classes.margin} 
                        onClick={()=>{
                            userContext.clearMessages()
                            userContext.forgotPassword({ email: values.email })
                        }}
                    >
                        Get New Password
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