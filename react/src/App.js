import logo from './logo.svg';
import './App.css';
import {Box, Button, Grid} from '@mui/material';
import BmiBox from './BmiBox';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {BrowserRouter, Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Main from "./Main";
import ListBook from "./ListBook";
import EditBook from "./EditBook";
import PatientList from "./PatientList";
import Patient from "./Patient";
import NotFound from "./NotFound";
import React, {createContext, useContext, useEffect} from "react";
import SignIn from "./SignIn";
import jwtDecode from "jwt-decode";
import {tokenObject} from "./api";

const AppContext = createContext(
    {signIn: null, signOut: null}
);

const RequireAuth = ({children}) => {
    let navigate = useNavigate();
    let location = useLocation();
    let appContext = useContext(AppContext);
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        console.log(accessToken);
        if (accessToken == null) {
            navigate('/signin', {replace: true})
        } else {
            tokenObject.token = accessToken;
            const jwtDecoded = jwtDecode(accessToken);
            if (jwtDecoded.exp * 1000 < new Date().getTime()) {
                appContext.signOut();
            }
        }


    }, [location])
    return children;
}

function App() {
    const signIn = (email, password) => {

    }
    //  npm install jwt-decode
    const signOut = () => {
        localStorage.clear();
        window.location = '/signin'
        // navigate('/signin', {replace: true});
    }
    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Link to='/'>
                            <MenuIcon/>
                        </Link>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Patient App
                    </Typography>
                    <Button onClick={() => signOut()} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <AppContext.Provider value={{
                signIn, signOut
            }}>
                <Routes>
                    <Route path='/signin' element={<SignIn></SignIn>}></Route>
                    <Route path='/' element={
                        <RequireAuth>
                            <Main/>
                        </RequireAuth>
                    }></Route>
                    <Route path='/list-book' element={<ListBook/>}></Route>
                    <Route path='/edit-book' element={<EditBook></EditBook>}></Route>
                    <Route path='/edit-book/:id' element={<EditBook></EditBook>}></Route>
                    <Route path='/patient-list' element={
                        <RequireAuth>
                            <PatientList/>
                        </RequireAuth>
                    }></Route>
                    <Route path='/patient/:id' element={<Patient/>}></Route>

                    <Route path='*' element={<NotFound/>}></Route>
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

export default App;
