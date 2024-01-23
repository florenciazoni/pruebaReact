
import React from 'react';
import {
    Button,
    Dialog as DialogComponent, 
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {
    return (
        <div>
            <DialogComponent
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
            >
              <DialogContent>
                {props.children}
                <DialogContentText>
                  {props.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                  {props.CloseText}
                </Button>
                {props.okText!==undefined &&
                <Button onClick={props.handleOk} color="primary">
                  {props.okText}
                </Button>
                }
              </DialogActions>
            </DialogComponent>
        </div>
    )
}
Dialog.defaultProps = {
    message:'',
    open:false,
    CloseText:'Cerrar'
}
export default Dialog;

/*import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog() {  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
*/