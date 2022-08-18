import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from 'NotFound';
import Main from 'Main';
import ListBook from 'ListBook';
import EditBook from 'EditBook';
import PatientList from 'PatientList';
import Patient from 'Patient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/cal-bmi' element={<App/>}></Route>
        <Route path='/list-book' element={<ListBook/>}></Route>
        <Route path='/edit-book' element={<EditBook></EditBook>}></Route>
        <Route path='/edit-book/:id' element={<EditBook></EditBook>}></Route>
        <Route path='/patient-list' element={<PatientList/>}></Route>
        <Route path='/patient/:id' element={<Patient/>}></Route>
        
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
