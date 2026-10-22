
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserCard from "./UserCard";

function Dashboard() {
    const {
        user,
        getUsers,
        deleteUser,
        logout,
        message,
        setMessage
    } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch users
    const handleGetUsers = async () => {
        setLoading(true);
        setMessage("");

        try {
            const result = await getUsers();
            setUsers(result.list);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Could not fetch users"
            );

            if (error.response?.status === 401) {
                logout();
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const result = await deleteUser(id);

            setUsers((previousUsers) =>
                previousUsers.filter((item) => item._id !== id)
            );

            setMessage(result.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Could not delete user"
            );

            if (error.response?.status === 401) {
                logout();
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard">
            <div className="card">
                <h2>Dashboard</h2>

                <h3>Welcome, {user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Role: <strong>{user.role}</strong></p>

                <button onClick={handleGetUsers} disabled={loading}>
                    {loading ? "Please wait..." : "View All Users"}
                </button>

                {message && <p className="message">{message}</p>}
            </div>

            <div className="users">
                {users.map((item) => (
                    <UserCard
                        key={item._id}
                        item={item}
                        isAdmin={user.role === "admin"}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
