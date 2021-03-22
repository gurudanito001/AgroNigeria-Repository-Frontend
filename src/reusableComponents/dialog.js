import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog( props ) {

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={()=>{props.setOpenDialog(false)}} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete User Account`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Account with Email <strong>{props.email}</strong> will be deleted permanently.<br/>
            This action cannot be reversed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="text-secondary" onClick={()=>{props.setOpenDialog(false)}}>
            Cancel
          </Button>
          <Button className="text-danger" autoFocus onClick={props.deleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}