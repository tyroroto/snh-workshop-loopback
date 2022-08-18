import { Box, Button, Container, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    const navigator = useNavigate();
    return <Container maxWidth="sm">
        <h1> Main Page</h1>
        <Box><Link to='/patient-list'> Go to Patient List</Link></Box>
        <Box><Link to='/cal-bmi'> Go to Cal BMI</Link></Box>
        <Box><Link to='/list-book'> Go to Listbook</Link></Box>

        
        {/* <Button onClick={() => {
            navigator('/cal-bmi');
        }}
        > Got to Cal BMI</Button> */}
    </Container>
};
export default Main;