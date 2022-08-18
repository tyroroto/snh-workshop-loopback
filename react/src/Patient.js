import {Grid, Container, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";

const Patient = () => {

    return <Container>
        <h1>Patient</h1>
        <Grid container>
            <Grid item xs={6}>
                <Box>
                    <h1>HN</h1>
                    <h1>ชื่อ นามสกุล</h1>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Button>Add Booking</Button>
            </Grid>
            <Grid item xs={12}>
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
                            {[].map((data, index) => {
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