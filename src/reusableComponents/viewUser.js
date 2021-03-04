import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, Link, useParams } from "react-router-dom";
import { MyContext } from '../store/index';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ViewUser() {
  const userContext = useContext(MyContext)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let { id } = useParams();
  let user = userContext.getOneUser(id)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="caption" display="block">
            Full Name
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
            {user.firstName} { user.lastName}
        </Typography>

        

        <Typography variant="caption" display="block">
            Email
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
            {user.email}
        </Typography>

        <Typography variant="caption" display="block">
            Role
        </Typography>
        <Typography variant="subtitle2" gutterBottom className="mt-0 pt-0">
            {user.role}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" className="ml-auto text-danger">Delete</Button>
      </CardActions>
    </Card>
  );
}