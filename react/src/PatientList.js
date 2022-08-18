import { Box, Typography, Grid, Container, Button } from "@mui/material";
import { getPatientList } from "api";
import PatientTable from "PatientTable";
import { useEffect, useState } from "react";

const PatientList = () => {
    const [patientData, setPatientData] = useState([]);
    useEffect( () => {
        getPatientList().then( (data) => {
            setPatientData(data);
        })
    }, [])
    return <Container>
        <Grid container>
            <Grid item xs={9}>
                <h1>Patient List</h1>
            </Grid>
            <Grid item xs={3}>
                <Box mt={2}>
                <Button variant="contained">ค้นหา</Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <PatientTable currentData={patientData}></PatientTable>
            </Grid>
        </Grid>
    </Container>
}

export default PatientList;