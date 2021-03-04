import React, { useEffect, useContext, } from 'react'
import  { MyContext } from '../store/';
import { BrowserRouter as Router, useHistory, } from "react-router-dom";
import DrawerNavigation from '../reusableComponents/drawerNavigation'
import PersistentNavigation from '../reusableComponents/persistentNavigation';

const DashboardContent = (context) =>{
    return (
        <h1>Welcome!!! You have Logged {context.user.loggedIn ? "in to" : "out of"} the main App </h1>
    )
}


const Dashboard = () =>{
    const mycontext = useContext(MyContext)
    let loggedIn = mycontext.user.loggedIn
    let history = useHistory();
    useEffect( ()=>{
        console.log("component just mounted or updated")
    }, [loggedIn])
    return (
        <MyContext.Consumer>
            {(context) => (
                <>
                    {DashboardContent(context)}
                </>
            )}
        </MyContext.Consumer>
    )
}
export default Dashboard;