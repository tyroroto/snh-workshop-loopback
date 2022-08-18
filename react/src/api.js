const { default: axios } = require("axios")
const apiUrl = 'http://localhost:3000';

const getPatientList = async () => {
    const res = await axios.get(apiUrl + '/patients');
    return res.data;
}

const getPatient = (id) => {
    const res = await axios.get(apiUrl + '/patients/' + id);
    return res.data;
}

const searchPatient = (hn) => {

}

const bookingPatient = (id, booking) => {

}