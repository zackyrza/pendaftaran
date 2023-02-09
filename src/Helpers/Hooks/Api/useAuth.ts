import axios from "axios";
import { useContext, useState } from "react";

import { API_URL } from "Config";
import { TokenContext } from "Helpers/Hooks/Context/token";
import { UserContext } from "Helpers/Hooks/Context/user";
import { IUserPost } from "Helpers/Interface/User";

export function useAuth() {
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        id: 0,
        email: "",
        password: "",
        fullName: "",
        role: "",
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const [loading, setLoading] = useState(false);
    const tokenContext = useContext(TokenContext);
    const userContext = useContext(UserContext);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(API_URL+'/users/login', {
                email,
                password,
                isCMS: true,
            });
            tokenContext.setToken(response.data.token);
            userContext.setUser(response.data.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data));

            return response.data;
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            throw error.response.data;
        }
    }

    const logout = async () => {
        try {
            await tokenContext.setToken('');
            await userContext.setUser({
                id: 0,
                email: "",
                password: "",
                fullName: "",
                role: "",
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await localStorage.removeItem('token');
            await localStorage.removeItem('user');
            return true;
        } catch (error: any) {
            setErrorMessage('Terjadi kesalahan saat logout');
            throw error;
        }
    }

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'GET',
                url: API_URL + '/users',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            setLoading(false);
            userContext.setUsers(response.data.data);
            setUsers(response.data.data);
            return response.data.data;
        } catch (error: any) {
            setLoading(false);
            userContext.setUsers([]);
            setUsers([]);
            setErrorMessage(error.response.data.message);
            throw error.response.data;
        }
    }

    const getUserById = async (id: number) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'GET',
                url: API_URL + '/users/' + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            setLoading(false);
            userContext.setUser(response.data.data);
            setUser(response.data.data);
            return response.data.data;
        } catch (error: any) {
            setLoading(false);
            userContext.setUser({
                id: 0,
                email: "",
                password: "",
                fullName: "",
                role: "",
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            setUser({
                id: 0,
                email: "",
                password: "",
                fullName: "",
                role: "",
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            setErrorMessage(error.response.data.message);
            throw error.response.data;
        }
    };

    const createUser = async (data: IUserPost) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL + '/users',
                data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            setLoading(false);
            return response.data.data;
        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
            throw error.response.data;
        }
    };

    const updateUser = async (id: number, data: IUserPost) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'PUT',
                url: API_URL + '/users/' + id,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            setLoading(false);
            return response.data.data;
        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
            throw error.response.data;
        }
    };

    const deleteUser = async (id: number) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'DELETE',
                url: API_URL + '/users/' + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            setLoading(false);
            return response.data.data;
        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
            throw error.response.data;
        }
    };

    return {
        login,
        logout,
        errorMessage,
        loading,
        getUser,
        users,
        getUserById,
        user,
        createUser,
        updateUser,
        deleteUser,
    }
}