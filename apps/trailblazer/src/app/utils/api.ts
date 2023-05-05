import axios from 'axios';

export async function getUserDetails() {
    return axios.get(`${process.env.NX_API_URL}/auth`, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
};