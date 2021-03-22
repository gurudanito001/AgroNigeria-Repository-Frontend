import React, { Component, useEffect } from 'react';
import axios from 'axios';
import {serverURL} from '../config';
import { useHistory } from "react-router-dom";
import ValidateAuthenticate from '../validation/authenticate';
import RegisterUserValidation from '../validation/registerUser';
import ValidateResetPassword from '../validation/resetPassword';

export const MyContext = React.createContext();

export default class MyProvider extends Component {

    constructor (props) {
        super(props);
        this.state = {
            auth: {
                accessToken: ""
            },
            messages: {
                errors: {
                    appError: "",
                    login: "",
                    forgotPassword: "",
                    resetPassword: "",
                    addNewUser: ""
                },
                success: {
                    forgotPassword: "",
                    resetPassword: "",
                    addNewUser: ""
                }
            },
            user:{
                loggedIn: false,
                id: "",
                firstName: "Daniel",
                lastName: "Nwokocha",
                email: "",
                password: ""
            },
            users: [
            ]
        }
    }

    componentDidMount = ()=>{
        let accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            let auth = this.state.auth
            auth.accessToken = accessToken
            this.setState({ auth: auth })
        }
    } 

    /* fetchMyData = () =>{
        const id = '604f25b95caf7336ac097cc2'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1cnVkYW5pdG8wMDFAZ21haWwuY29tIiwiaWF0IjoxNjE1OTExODY3LCJleHAiOjE2MTU5MTE4OTd9.1p8EJvrkQRnWzL6Z53coltyYoW2D6Gatyu_MEpszSLc'
        axios.get(`${serverURL}/users/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            if(error.response.data.message.message === "jwt expired"){
                console.log("jwt expired")
            }
        })
    } */

    refreshTokens = ( callbackFunc )=>{
        // make the api call
        // return the results of the call
        // the component that made use of this function will make decision
        // based on the result of the api call
        const refreshToken = localStorage.getItem("refreshToken")
        axios.post(`${serverURL}/refresh-token`, {refreshToken: refreshToken})
        .then((res) => {
            if(res.data.success){
                let { accessToken, refreshToken } = res.data.data
                let auth = this.state.auth
                auth.accessToken = accessToken;
                this.setState({ auth: auth })
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("accessToken", accessToken);
                if(callbackFunc){
                    callbackFunc()
                }
            }
        })
        .catch((error) => {
            console.log(error.response.data.message)
        });
    }

    authenticate = ( email, password )=>{
        let authValidation = ValidateAuthenticate(email, password)
        
        if(authValidation.isValid){
            axios.post(`${serverURL}/authenticate`, authValidation.loginDetails)
            .then((res) => {
                if(res.data.success){
                    let { accessToken, refreshToken } = res.data.data
                    let auth = this.state.auth
                    auth.accessToken = accessToken;
                    this.setState({ auth: auth })
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("accessToken", accessToken);
                }
            })
            .catch((error) => {
                this.setError("login", error.response.data.message || error.response.data )
            });
        }
        return this.setError("login", authValidation.errorMessage)
    }

    logout = () =>{
        /* let user = this.state.user;
        let userKeys = Object.keys(user);
        userKeys.forEach(key => {
            if(key === "loggedIn"){
                user[key] = false
            }else{
                user[key] = ""
            }
        });
        this.setState({ user: user }, ()=>{console.log(this.state.user)}) */

        let auth = this.state.auth
        auth.accessToken = ""
        this.setState({ auth : auth })
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

    }

    forgotPassword = ( email )=>{
        console.log(email)
        if(email.email === ""){
            return this.setError("forgotPassword", "Email is required")
        } 
        axios.put(`${serverURL}/forgot-password`, email)
            .then((res) => {
                if(res.data.success){
                    this.setSuccessMessage("forgotPassword", res.data.message)
                }
            })
            .catch((error) => {
                this.setError("forgotPassword", error.response.data.message || error.response.data )
            }); 
    }

    resetPassword = (resetLink, password1, password2) =>{
        let validationResult = ValidateResetPassword(resetLink, password1, password2)

        console.log(validationResult)
        if(validationResult.isValid){
            console.log(validationResult.resetDetails)
            /* axios.put(`${serverURL}/reset-password`, validationResult.resetDetails)
            .then((res) => {
                console.log(res)
                if(res.data.success){
                    this.setSuccessMessage("resetPassword", res.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
                this.setError("resetPassword", error.response.data.message || error.response.data )
            }); */
        }else{
            console.log(validationResult.errorMessage)
            this.setError("resetPassword", validationResult.errorMessage)
        }
    } 

    setError = (name, errorMessage)=>{
        let messages = this.state.messages;
        messages.errors[name] = errorMessage;
        this.setState({ messages: messages })
    }
    setSuccessMessage = (name, errorMessage) =>{
        let messages = this.state.messages;
        messages.success[name] = errorMessage;
        this.setState({ messages: messages })
    }
    clearAllMessages = ()=>{
        let messages = this.state.messages;
        let errorKeys = Object.keys(messages.errors);
        let successKeys = Object.keys(messages.errors);
        errorKeys.forEach(key => {
            messages.errors[key] = ""
        });
        successKeys.forEach(key => {
            messages.errors[key] = ""
        });
        this.setState({ messages: messages })
    }
    getAllUsers = ()=>{
        axios.get(`${serverURL}/users`, {
            headers: {
                'Authorization': `Bearer ${this.state.auth.accessToken}`
            }
        })
        .then((res) => {
            console.log(res)
            if(res.data.success){
                this.setState({ users: res.data.data })
            }
        })
        .catch((error) => {
            if(error.response.data.message.message === "jwt expired"){
                console.log("jwt expired")
            }
            /* this.setError("appError", error.response.data.message || error.response.data ) */
        }); 


        /* axios.get(`${serverURL}/users/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            if(error.response.data.message.message === "jwt expired"){
                console.log("jwt expired")
            }
        }) */
    }
    getOneUser = (id)=>{
        let allUsers = this.state.users;
        let singleUser
        allUsers.map( user =>{
            if(user._id === id){
                singleUser = user
            }
        })
        return singleUser
    }
    /* addNewUser = (data)=>{
        let validationResult =  RegisterUserValidation(data)
        if(validationResult.isValid){
            axios.post(`${serverURL}/register`, validationResult.newUser)
            .then((res) => {
                console.log(res)
                if(res.data.success){
                    this.getAllUsers()
                    this.setSuccessMessage('addNewUser', res.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
                this.setError("addNewUser", error.response.data.message || error.response.data )
            }); 
        }else{
            console.log(validationResult.errorMessage)
            this.setError("addNewUser", validationResult.errorMessage)
        }
    } */

  render(){
    return(
      <MyContext.Provider value={{
        auth: this.state.auth,
        errors: this.state.messages.errors,
        success: this.state.messages.success,
        users: this.state.users,
        setError: this.setError,
        authenticate: this.authenticate,
        logout: this.logout,
        forgotPassword: this.forgotPassword,
        resetPassword: this.resetPassword,
        //addNewUser: this.addNewUser,
        clearMessages: this.clearAllMessages,
        getOneUser: this.getOneUser,
        refreshTokens: this.refreshTokens
      }}>
          {this.props.children}
      </MyContext.Provider>
    )
  }
}
