
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
    const {
        registerData,
        setRegisterData,
        register,
        message,
        setMessage
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle controlled inputs
    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await register();
            navigate("/login");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Create Account</h2>

            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Full Name"
                    value={registerData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password (minimum 8 characters)"
                    value={registerData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />

                <button disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p>
                Already registered? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;
