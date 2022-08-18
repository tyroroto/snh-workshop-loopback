import { Box, Typography, Grid, Container, Button } from "@mui/material";
import PatientTable from "PatientTable";

const PatientList = () => {

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
                <PatientTable></PatientTable>
            </Grid>
        </Grid>
    </Container>
}

export default PatientList;