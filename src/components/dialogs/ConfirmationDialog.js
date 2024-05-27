import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteOfferDialog({ openDeleteDialog, handleConfirm, dialogDetails }) {

    const handleClose = () => {
        handleConfirm(false);
    };

    const handleConfirmed = () => {
        handleConfirm(true);
    };

    return (
        <div>
            <Dialog
                open={openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogDetails.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      
                        {dialogDetails.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anulare</Button>
                    <Button style={{ color: "red" }} onClick={handleConfirmed} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteOfferDialog;
