import {Grid, Container, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import { searchPatient } from "api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Patient = () => {
    const [patient, setPatient] = useState({})
    const params = useParams();
    useEffect( () => {
        searchPatient(params.id).then( result => {
            console.log(result)
            setPatient(result);
        }).catch( e => {
            console.error(e);
            alert('ไม่พบผู้ป่วย');
            navigator('/patient-list');
        })
    }, []); 
    return <Container>
        <h1>Patient</h1>
        <Grid container>
            <Grid item xs={6}>
                <Box>
                    <h3>HN: {patient.hn}</h3>
                    <h3>ชื่อ-นามสกุล: {patient.firstname} {patient.lastname}</h3>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Button>Add Booking</Button>
            </Grid>
            <Grid item xs={12}>
                <h1>Booking</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>code</TableCell>
                                <TableCell>name</TableCell>
                                <TableCell>price</TableCell>
                                <TableCell>action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patient.bookings?.map((data, index) => {
                                return <TableRow key={index}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.code}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.price}</TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

    </Container>
}

export default Patient;