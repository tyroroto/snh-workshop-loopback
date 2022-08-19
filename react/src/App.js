import logo from './logo.svg';
import './App.css';
import {Box, Grid} from '@mui/material';
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

const AppContext = createContext({signIn: null, signOut: null});

function RequireAuth({children}) {
    // let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        console.log(accessToken);
        if (accessToken == null) {
            navigate('/signin', {replace: true})
        }
    }, [location])
    // check jwt

    return children;
}

function App() {
    const signIn = (email, password) => {

    }
    const signOut = () => {
        localStorage.removeItem('accessToken');
    }
    return (
        <AppContext.Provider value={{
            signIn, signOut
        }}>
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
                        {/* <Button color="inherit">Login</Button> */}
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path='/' element={<Main/>}></Route>
                    {/*<Route path='/cal-bmi' element={<App />}></Route>*/}
                    <Route path='/list-book' element={<ListBook/>}></Route>
                    <Route path='/edit-book' element={<EditBook></EditBook>}></Route>
                    <Route path='/edit-book/:id' element={<EditBook></EditBook>}></Route>
                    <Route path='/signin' element={<SignIn></SignIn>}></Route>
                    <Route path='/patient-list' element={
                        // <RequireAuth>
                            <PatientList/>
                        // </RequireAuth>
                    }></Route>
                    <Route path='/patient/:id' element={<Patient/>}></Route>

                    <Route path='*' element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
