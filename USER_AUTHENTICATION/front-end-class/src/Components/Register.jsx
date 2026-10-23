import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Register() {
    const { registerData, setRegisterData, registration } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registration();
            setRegisterData({
                name : "",
                email : "",
                password : ""
            })
            navigate('/login');
            // console.log("registration successful...")
        } catch (error) {
            console.log("error occurred while registration", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={registerData.name}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={registerData.password}
                    onChange={handleChange}
                />
                <br /><br />

                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register
