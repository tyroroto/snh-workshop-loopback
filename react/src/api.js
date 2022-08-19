const {default: axios} = require("axios")
const apiUrl = 'http://localhost:3000';

const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')
export let tokenObject = {token: accessToken, refreshToken};

axios.interceptors.request.use(
    async (config) => {
        if (tokenObject.token) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${tokenObject?.token}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;

            const result = await axios.post(
                apiUrl + '/users/refresh',
                {refreshToken: tokenObject.refreshToken}
            );

            if (result.data.accessToken) {
                tokenObject.token = result.data.accessToken;
                // localStorage.removeItem('refreshToken')
                localStorage.setItem('accessToken', result.data.accessToken)

                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result.data.accessToken}`,
                };
            }
            return axios(config);
        }
        return Promise.reject(error);
    }
);


const onReject = (e) => {
    tokenObject.token = '';
    localStorage.clear();
    window.location = '/signin';
    console.error(e);
}

export const searchPatient = async (hn) => {
    try {
        const res =  await axios.post(
            apiUrl + '/patients/search',
            {hn: parseInt(hn)}
        );
        return res.data;
    } catch (e) {
        onReject(e);
    }
}


export const signUp = async (userData) => {
    const res = await axios.post(apiUrl + '/signup', userData);
    return res.data;
}

export const signIn = async (credential) => {
    const res = await axios.post(apiUrl + '/users/refresh-login', credential);
    return res.data;
}

export const getPatientList = async () => {
    try {
        const res = await axios.get(apiUrl + '/patients',);
        return res.data;
    } catch (e) {
        onReject(e);
    }
}

export const getPatient = async (id) => {
    const res = await axios.get(apiUrl + '/patients/' + id);
    return res.data;
}

export const bookingPatient = async (hn, code) => {
    try {
        const res = await axios.post(
            apiUrl + '/patients/book',
            {hn, code}
        );
        return res.data;
    } catch (e) {
        onReject(e);
    }
}