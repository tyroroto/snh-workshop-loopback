const { default: axios } = require("axios")
const apiUrl = 'http://localhost:3000';

export const getPatientList = async () => {
    const res = await axios.get(apiUrl + '/patients');
    return res.data;
}

export const getPatient = async (id) => {
    const res = await axios.get(apiUrl + '/patients/' + id);
    return res.data;
}

export const searchPatient = async (hn) => {
    const res = await axios.post(
        apiUrl + '/patients/search',
        { hn: parseInt(hn) }
    );
    return res.data;
}

export const bookingPatient = async (hn, code) => {
    const res = await axios.post(
        apiUrl + '/patients/book',
        { hn, code }
    );
    return res.data;
}