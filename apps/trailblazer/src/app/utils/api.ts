import axios from 'axios';
import fs from 'fs';

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

export async function getAllUsers() {
    return axios.get(`${process.env.NX_API_URL}/users/all`, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
}

export async function updateMe(data: any) {
    return axios.put(`${process.env.NX_API_URL}/users/me`, data, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
}

export async function getMe() {
    return axios.get(`${process.env.NX_API_URL}/users/me`, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
}

export async function createPokedexJSON() {
    return axios.get(`${process.env.NX_API_URL}/pokedex`, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
}

export async function getAllOnlineUsers() {
    return axios.get(`${process.env.NX_API_URL}/users/all/online`, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
}

export async function sendTradeRequest(user: any) {
    return axios.post(`${process.env.NX_API_URL}/users/trade`, user, {
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
}