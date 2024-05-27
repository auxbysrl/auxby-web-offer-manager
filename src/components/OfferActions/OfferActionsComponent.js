import { Stack } from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteOffer, changeStatusOffer } from "../../redux/actions/offers";
import Button from "@mui/material/Button";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function OfferActionsComponent({ offerDetails }) {
    const [openConfigDialog, setOpenConfigDialog] = useState(false);
    const [state, setState] = useState({
        open: false,
        successful: false,
        message: "",
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open, successful, message } = state;
    const confirmationDialogDetails = {
        title: "Șterge anunțul",
        description: "Sigur doriți să ștergeți acest anunț?"
    }
    const dispatch = useDispatch();
    let navigate = useNavigate();

    let label = offerDetails.status == "Active" ? offerDetails.isOnAuction ? "Închide licitația" : "Dezactivează anunțul" : "Activează anunțul";
    const handleCloseSnackBar = () => {
        setState({ ...state, open: false });
    };

    const onEditClicked = () => {
        navigate("/add-offer", { state: { offer: offerDetails } })
    }

    const onChangeStatusClicked = () => {
        dispatch(changeStatusOffer(offerDetails.id, 0))// TODO
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                console.log("TEST " + error)
            });
    }
    // TODO confirm dialogs

    const onDeleteClicked = () => {
        setOpenConfigDialog(true)
    }

    const handleConfirmDialog = (confirmed) => {
        setOpenConfigDialog(false);
        if (confirmed) {
            dispatch(deleteOffer(offerDetails.id))
                .then(() => {
                    setState({
                        ...state,
                        open: true,
                        successful: true,
                        message: "Anuntul a fost sters cu success!"
                    });
                    navigate("/")
                })
                .catch((error) => {
                    console.error(error)
                    setState({
                        ...state,
                        open: true,
                        successful: false,
                        message: "Nu s-a reusit stergerea acestui anunt. Incearca din nou!"
                    });
                });
        }
    };

    return (
        <Stack direction="row">
            <Button onClick={onChangeStatusClicked} hidden={offerDetails.status == "Interrupted"} className="action-btn">{label}</Button>
            <Button onClick={onEditClicked} hidden={offerDetails.status == "Active"} className="action-btn">Edit</Button>
            <Button hidden={offerDetails.status == "Active"} onClick={onDeleteClicked} className="action-btn">Delete</Button>

            <ConfirmationDialog openConfigDialog={openConfigDialog} handleConfirm={handleConfirmDialog} dialogDetails={confirmationDialogDetails} />
            <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} onClose={handleCloseSnackBar} autoHideDuration={4000} >
                <Alert severity={successful ? "success" : "error"} sx={{ width: '100%' }} onClose={handleCloseSnackBar}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default OfferActionsComponent;