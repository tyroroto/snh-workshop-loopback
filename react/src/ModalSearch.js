import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { searchPatient } from './api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModalSearch() {
    const [open, setOpen] = useState(false);
    const [hn, setHN] = useState('');
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        if( hn != 0 ) {
            searchPatient(hn).then( result => {
                console.log(result)
                navigate('/patient/'+ result.hn);
            }).catch( e => {
                console.error(e);
                alert('ไม่พบผู้ป่วย')
            })
        }
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                ค้นหาผู้ป่วย
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ค้นหาผู้ป่วย</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        กรุณาระบุ HN
                    </DialogContentText>
                    <TextField
                        value={hn}
                        onChange={
                            (e) => {
                                setHN(e.target.value)
                            }
                        }
                        autoFocus
                        margin="dense"
                        id="name"
                        label="HN"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Search</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
