import { Container, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = 'http://localhost:3000';

const ListBook = () => {

    const [currentData, setCurrentData] = useState([])
    const loadData = () => {
        axios.get(apiUrl + '/bookings').then(response => {
            setCurrentData(response.data);
        }).catch(e => {
            console.error('get api error', e);
        })
    }
    useEffect(() => {
       loadData();
    }, [])

    return <Container>
        <h1> List Booking
            <Link to='/edit-book'> Create </Link>
        </h1>
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
                    {currentData.map((data, index) => {
                        return <TableRow key={index}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.code}</TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.price}</TableCell>
                            <TableCell>
                                <Link to={'/edit-book/' + data.id}>EDIT</Link>
                                <Button color='error' onClick={()=>{
                                    axios.delete(apiUrl+'/bookings/'+data.id)
                                    .then( () => {
                                        alert('DELETE SUCCESS');
                                        loadData();
                                    })
                                    .catch(e=>console.error(e))
                                }}> Del </Button>
                            </TableCell>
                        </TableRow>
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}

export default ListBook;