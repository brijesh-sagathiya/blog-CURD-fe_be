import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.xsrfCookieName['qwe_123'] = `${token}`;
    } else {
        delete axios.defaults.xsrfCookieName['qwe_123'];
    }
};

export default setAuthToken;
