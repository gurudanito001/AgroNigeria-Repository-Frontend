import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog( props ) {
  /* const [open, setOpen] = React.useState(false); */

  /* const handleClickOpen = () => {
    setOpen(true);
  }; */

  /* const handleClose = () => {
    setOpen(false);
  }; */

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.openDialog}
        /* onClose={handleClose} */
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete User Account`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Account with Email {props.email} will be deleted permanently.<br/>
            This action cannot be reversed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="text-secondary" onClick={()=>{props.setOpenDialog(false)}}>
            Cancel
          </Button>
          <Button className="text-danger" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}