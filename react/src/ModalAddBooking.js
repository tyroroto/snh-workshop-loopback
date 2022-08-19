import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useEffect, useState } from 'react';
import ListBook from './ListBook';
import { PatientContext } from './Patient';

export default function ModalAddBooking({}) {
    const patientContext = useContext(PatientContext)
    const [open, setOpen] = useState(false);
    useEffect(() => {
        console.log(patientContext);
    }, [patientContext])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Booking
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>เลือก Booking ให้ HN {patientContext.patient?.hn}</DialogTitle>
                <DialogContent>
                    <ListBook
                        onSelect={(b)=>{
                            setOpen(false)
                            patientContext.onSelectBooking(b)
                        }}
                                 readOnly={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
