const PatientTable = ({currentData}) => {
    return  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>id</TableCell>
                <TableCell>hn</TableCell>
                <TableCell>firstname</TableCell>
                <TableCell>lastname</TableCell>
                <TableCell>action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {currentData.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.hn}</TableCell>
                    <TableCell>{data.firstname}</TableCell>
                    <TableCell>{data.lastname}</TableCell>
                    <TableCell>
                        <Link to={'/patient/' + data.id}>Open</Link>
                    </TableCell>
                </TableRow>
            })}

        </TableBody>
    </Table>
</TableContainer>
}

export default PatientTable;