import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = "http://localhost:7070/auth/user";

export const AuthProvider = ({ children }) => {

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loginData, setLoginData] = useState({
        email : '',
        password : ''
    })

    const registration = async () => {
        try {
            const response = await axios.post(
                `${API}/register`,
                registerData
            );
            console.log(response.data);
            return response.data;``
        } catch (error) {
            console.log(
                "error while registration in registration context",
                error.response?.data || error.message
            );
            throw error;
        }
    };

    const login = async() =>{
        try {
            const response= await axios.post(`${API}/login`, loginData);

            const new_token = response.data.token;
            const new_data = response.data.data;
            console.log(response.data)
        } catch (error) {
            console.log('error while login data')
        }
    }

    return (
        <AuthContext.Provider
            value={{ registerData, setRegisterData, registration, loginData, setLoginData, login }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};
