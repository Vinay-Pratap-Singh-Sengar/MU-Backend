
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const {
        loginData,
        setLoginData,
        login,
        message,
        setMessage
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle controlled inputs
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await login();
            navigate("/dashboard");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Login</h2>

            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />

                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>
                New user? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;
