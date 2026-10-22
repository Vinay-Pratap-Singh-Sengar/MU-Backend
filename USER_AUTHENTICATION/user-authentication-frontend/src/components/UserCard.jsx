
function UserCard({ item, isAdmin, onDelete, loading }) {
    return (
        <div className="user-card">
            <h3>{item.name}</h3>

            <p>Email: {item.email}</p>
            <p>Role: {item.role}</p>

            {isAdmin && (
                <button
                    className="delete"
                    disabled={loading}
                    onClick={() => onDelete(item._id)}
                >
                    Delete User
                </button>
            )}
        </div>
    );
}

export default UserCard;
