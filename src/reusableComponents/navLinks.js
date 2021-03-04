import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Logo from '../images/agronigeriaLogo.png';
import { useHistory, Link } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    active: {
      backgroundColor: 'rgb(228, 228, 228)',
    }
  }));

export default function NavLinks( props ) {
    const location = useLocation()
    function isRouteActive(){
        for (var i = 0; i < arguments.length; i++) {
             if(location.pathname === arguments[i]){
                 return true
             }
        }
        return false
    }
    const classes = useStyles()
    return(
        <>
        <div className="py-1 mt-1 py-sm-2 mt-sm-1 pl-3 ml-1">
            <img src={Logo} />
        </div>
        <Divider />
        <List>
            <Link to="/" className="text-dark text-decoration-none">
                <ListItem button className={isRouteActive("/") ? classes.active : null}>
                    <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>

            <Link to="/users" className="text-dark text-decoration-none">
                <ListItem button className={isRouteActive("/users", "/users/new") ? classes.active : null}>
                    <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
            </Link>

            <ListItem button className={isRouteActive("/files") ? classes.active : null}>
                <ListItemIcon> <LocationCityIcon /> </ListItemIcon>
                <ListItemText primary="Organizations" />
            </ListItem>

            <ListItem button className={isRouteActive("/files") ? classes.active : null}>
                <ListItemIcon> <InsertDriveFileIcon /> </ListItemIcon>
                <ListItemText primary="Resources" />
            </ListItem>

            <ListItem button className={isRouteActive("/files") ? classes.active : null}>
                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                <ListItemText primary="Files" />
            </ListItem>
        </List>
        </>
    )
}