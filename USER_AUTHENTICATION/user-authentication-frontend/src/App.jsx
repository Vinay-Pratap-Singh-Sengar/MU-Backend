
import { useContext } from "react";
import {
    Routes,
    Route,
    Navigate,
    Link,
    useNavigate
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "./App.css";

// Protect dashboard route
function ProtectedRoute({ children }) {
    const { token, user } = useContext(AuthContext);

    return token && user
        ? children
        : <Navigate to="/login" replace />;
}

function App() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="app">
            <nav className="navbar">
                <Link to="/" className="brand">UserAuth</Link>

                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        {" | "}
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={token ? "/dashboard" : "/login"}
                            replace
                        />
                    }
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Login />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </div>
    );
}

export default App;
