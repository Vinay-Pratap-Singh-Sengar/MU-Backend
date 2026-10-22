
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API = "http://localhost:7070/auth/user";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        sessionStorage.getItem("token") || ""
    );

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem("user")) || null;
        } catch {
            return null;
        }
    });

    const [message, setMessage] = useState("");

    // Register form state
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Login form state
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    // Register user
    const register = async () => {
        const response = await axios.post(
            `${API}/register`,
            registerData
        );

        setRegisterData({
            name: "",
            email: "",
            password: ""
        });

        setLoginData({
            email: registerData.email,
            password: ""
        });

        setMessage(response.data.message);
        return response.data;
    };

    // Login user
    const login = async () => {
        const response = await axios.post(
            `${API}/login`,
            loginData
        );

        const newToken = response.data.token;
        const newUser = response.data.data;

        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("user", JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);

        setLoginData({
            email: "",
            password: ""
        });

        setMessage(response.data.message);
        return response.data;
    };

    // Get all users using the token
    const getUsers = async () => {
        const response = await axios.get(`${API}/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    };

    // Delete user by ID
    const deleteUser = async (id) => {
        const response = await axios.delete(`${API}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    };

    // Logout user
    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setToken("");
        setUser(null);
        setMessage("");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                message,
                setMessage,
                registerData,
                setRegisterData,
                loginData,
                setLoginData,
                register,
                login,
                getUsers,
                deleteUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
