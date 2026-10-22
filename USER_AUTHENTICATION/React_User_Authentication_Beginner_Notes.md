# React User Authentication Project — Beginner Notes

These notes explain the project step by step using simple language. Read the concept first, then open the related file and follow the code.

## 1. What are we building?

We are building a React frontend for a user authentication system.

A user can:

1. Register a new account.
2. Log in with an email and password.
3. Open a dashboard after logging in.
4. View a list of users.
5. See a Delete User button if their role is `admin`.
6. Log out.

**Important:** React is the frontend. The backend API handles account creation, checks login details, creates the token, and must enforce permissions.

## 2. How does the application work?

Think of a college portal:

- **Register:** A student creates an account.
- **Login:** The student enters their email and password.
- **Token:** After successful login, the backend sends a token to the frontend.
- **Dashboard:** The frontend uses the login state to decide whether to show the dashboard.
- **Logout:** The frontend clears the saved login information.

### Request flow

```text
Register.jsx  ──register data──>  AuthContext.jsx  ──Axios request──> Backend API
Login.jsx     ──login data─────>  AuthContext.jsx  ──Axios request──> Backend API
Dashboard.jsx ──get users──────>  AuthContext.jsx  ──token + request─> Backend API
UserCard.jsx  <──one user data── Dashboard.jsx
```

## 3. Project folder structure

Use this structure:

```text
user-auth-frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── UserCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── package.json
└── vite.config.js
```

### What does each file do?

| File | Responsibility |
|---|---|
| `AuthContext.jsx` | Shares authentication state and contains Axios API functions |
| `Register.jsx` | Displays the registration form |
| `Login.jsx` | Displays the login form |
| `Dashboard.jsx` | Displays current user details and loads/deletes users |
| `UserCard.jsx` | Displays one user in a card |
| `App.jsx` | Defines routes and the protected route |
| `main.jsx` | Starts React and wraps the app with providers |
| `App.css` | Styles app components |
| `index.css` | Defines global styles |

## 4. Important React concepts

### 4.1 Component

A component is a reusable part of the user interface.

Examples in this project: `Register`, `Login`, `Dashboard`, and `UserCard`.

```jsx
function Welcome() {
    return <h1>Welcome to the portal</h1>;
}

export default Welcome;
```

### 4.2 State with `useState`

State is data that a component remembers. When state changes, React can update the screen.

```jsx
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}

export default Counter;
```

- `count` is the current value.
- `setCount` updates the value.
- `0` is the starting value.

### 4.3 Controlled inputs

A controlled input gets its value from React state.

```jsx
const [name, setName] = useState("");

<input
    name="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
/>
```

- `value={name}` shows the current state value in the input.
- `onChange` runs when the user types.
- `e.target.value` is the text typed into the input.

### 4.4 Form submission and `preventDefault`

```jsx
const handleSubmit = (e) => {
    e.preventDefault();
    // Run our form logic here
};

<form onSubmit={handleSubmit}>
    <button type="submit">Submit</button>
</form>
```

`e.preventDefault()` stops the browser's default form submission/reload, allowing React to handle the form.

### 4.5 The spread operator

The project updates one property without losing the other properties:

```jsx
setRegisterData({
    ...registerData,
    [e.target.name]: e.target.value
});
```

Suppose the current object is:

```js
{
    name: "Amit",
    email: "",
    password: ""
}
```

When the email input changes, `...registerData` keeps the existing values and `[e.target.name]` identifies the property to update.

### 4.6 Props

Props let a parent component pass data or functions to a child.

In `Dashboard.jsx`, the project passes `item`, `isAdmin`, `onDelete`, and `loading` to `UserCard`.

```jsx
<UserCard
    item={item}
    isAdmin={user.role === "admin"}
    onDelete={handleDelete}
    loading={loading}
/>
```

`UserCard.jsx` receives those props:

```jsx
function UserCard({ item, isAdmin, onDelete, loading }) {
    return <h3>{item.name}</h3>;
}
```

### 4.7 Context API and `useContext`

Context allows components to access shared values without passing the same props through every level.

In this project, `AuthContext.jsx` shares values and functions such as:

- `user`
- `token`
- `message`
- `register`
- `login`
- `getUsers`
- `deleteUser`
- `logout`

A component accesses them like this:

```jsx
const { user, logout } = useContext(AuthContext);
```

The `AuthProvider` supplies these values to components inside it.

### 4.8 `useNavigate`

`useNavigate` lets a component move to another route using JavaScript.

```jsx
const navigate = useNavigate();

navigate("/dashboard");
```

The login component navigates to `/dashboard` after a successful login.

## 5. Understanding `AuthContext.jsx`

This is the shared authentication file. It stores shared state and defines the functions that call the backend.

### 5.1 API base URL

```jsx
const API = "http://localhost:7070/auth/user";
```

This is the backend API base URL used in the provided project. The backend must actually be running at that address.

### 5.2 Token state

```jsx
const [token, setToken] = useState(
    sessionStorage.getItem("token") || ""
);
```

- Try to read the saved token from `sessionStorage`.
- If no token exists, start with an empty string.

### 5.3 User state

```jsx
const [user, setUser] = useState(() => {
    try {
        return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch {
        return null;
    }
});
```

The user was saved as JSON text, so `JSON.parse()` converts it back into a JavaScript value. The `try/catch` prevents invalid stored JSON from crashing this initialization.

### 5.4 Registration function

```jsx
const register = async () => {
    const response = await axios.post(
        `${API}/register`,
        registerData
    );

    setMessage(response.data.message);
    return response.data;
};
```

Step by step:

1. `axios.post()` sends the form data to the backend.
2. `await` waits for the request to finish.
3. `response.data` contains the response body returned by the backend.
4. The message is saved in state.
5. The response data is returned to the calling component.

The actual response shape depends on the backend.

### 5.5 Login function

```jsx
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

    return response.data;
};
```

This project expects the backend response to contain:

- `response.data.token`
- `response.data.data` for the user object

If the backend uses different property names, update the code to match its response.

`sessionStorage` stores data for the current browser tab session. Do not treat frontend storage as a secure place for secrets; an XSS vulnerability can expose its contents.

### 5.6 Get all users

```jsx
const getUsers = async () => {
    const response = await axios.get(`${API}/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
```

The request includes an Authorization header. `Bearer` is the conventional prefix followed by the token.

The provided dashboard expects the backend to return a `list` property containing the users.

### 5.7 Delete a user

```jsx
const deleteUser = async (id) => {
    const response = await axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
```

The user ID is added to the URL. The request also sends the token.

**Security rule:** The backend must check whether the requester is allowed to delete that user. Hiding the button in React is not sufficient authorization.

### 5.8 Logout

```jsx
const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setToken("");
    setUser(null);
    setMessage("");
};
```

This clears the saved values and resets the React state.

## 6. Understanding `Register.jsx`

### 6.1 Get shared state and functions

```jsx
const {
    registerData,
    setRegisterData,
    register,
    message,
    setMessage
} = useContext(AuthContext);
```

This component takes the form state and registration function from the context.

### 6.2 Update the form

```jsx
const handleChange = (e) => {
    setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value
    });
};
```

All three inputs use the same function. The `name` attribute tells React which property to update.

For example:

```jsx
<input
    name="email"
    value={registerData.email}
    onChange={handleChange}
/>
```

### 6.3 Submit the form

```jsx
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
```

- `try`: attempts registration.
- `catch`: handles a failed request.
- `finally`: resets the loading state whether the request succeeds or fails.
- `navigate("/login")`: sends the user to the login route after success.

The `?.` operator safely accesses a nested property when the earlier value is not available.

## 7. Understanding `Login.jsx`

`Login.jsx` follows almost the same form pattern as `Register.jsx`.

The important differences are:

1. It uses `loginData` and `setLoginData`.
2. It calls `login()`.
3. On success, it navigates to `/dashboard`.
4. It displays an error message if the login request fails.

```jsx
await login();
navigate("/dashboard");
```

The `login()` function saves the returned token and user in the context before navigation.

## 8. Understanding `App.jsx` and routing

### 8.1 What is a route?

A route connects a URL to a component.

Examples:

| URL | Component |
|---|---|
| `/register` | `Register` |
| `/login` | `Login` |
| `/dashboard` | `Dashboard` |

### 8.2 Protected route

```jsx
function ProtectedRoute({ children }) {
    const { token, user } = useContext(AuthContext);

    return token && user
        ? children
        : <Navigate to="/login" replace />;
}
```

Explain the condition in plain language:

- If a token exists and user data exists, render the requested component.
- Otherwise, redirect to `/login`.

The `children` are the elements placed inside `ProtectedRoute`.

This is a frontend navigation check, not a replacement for backend authentication. The backend must validate the token for protected API requests.

### 8.3 Route definition

```jsx
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
```

The dashboard is rendered inside `ProtectedRoute`, so the route check happens first.

## 9. Understanding `Dashboard.jsx`

### 9.1 Store the users

```jsx
const [users, setUsers] = useState([]);
```

The initial value is an empty array because no users have been loaded yet.

### 9.2 Fetch the users

```jsx
const result = await getUsers();
setUsers(result.list);
```

The dashboard calls the function from Context, receives the response, and stores the returned list in state.

### 9.3 Display user cards with `map()`

```jsx
{users.map((item) => (
    <UserCard
        key={item._id}
        item={item}
        isAdmin={user.role === "admin"}
        onDelete={handleDelete}
        loading={loading}
    />
))}
```

`map()` creates one `UserCard` for each user in the array.

- `item` is the current user.
- `key` gives React a stable identifier for each rendered item.
- `isAdmin` tells the card whether the current user has the admin role.
- `onDelete` passes the delete handler to the child component.

### 9.4 Remove a deleted user with `filter()`

```jsx
setUsers((previousUsers) =>
    previousUsers.filter((item) => item._id !== id)
);
```

`filter()` creates a new array containing every user whose ID does not match the deleted ID. React then renders the updated list.

## 10. Understanding `UserCard.jsx`

```jsx
function UserCard({ item, isAdmin, onDelete, loading }) {
    return (
        <div className="user-card">
            <h3>{item.name}</h3>
            <p>Email: {item.email}</p>
            <p>Role: {item.role}</p>

            {isAdmin && (
                <button
                    disabled={loading}
                    onClick={() => onDelete(item._id)}
                >
                    Delete User
                </button>
            )}
        </div>
    );
}
```

This component displays a single user.

The expression:

```jsx
isAdmin && <button>Delete User</button>
```

means the button is displayed only when `isAdmin` is truthy.

The parent provides the value of `isAdmin`. The backend must still enforce authorization when the delete request arrives.

## 11. Understanding `main.jsx`

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
```

Read it from the outside inward:

1. `createRoot()` prepares the HTML element where React will render.
2. `BrowserRouter` enables routing.
3. `AuthProvider` makes authentication context available to its descendants.
4. `App` renders the application.

This is why components inside `App` can use both React Router and `AuthContext`.

## 12. How to run and test the project

### Install the dependencies

Run inside the frontend folder:

```bash
npm install axios react-router-dom
```

### Start the application

1. Start the backend server on port `7070`.
2. Ensure the backend enables CORS for `http://localhost:5173`.
3. Run the frontend:

```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.

### Test checklist

- [ ] Register a new user.
- [ ] Check the registration success or error message.
- [ ] Log in with valid credentials.
- [ ] Confirm the dashboard displays the logged-in user.
- [ ] Click **View All Users**.
- [ ] Confirm the list is displayed.
- [ ] Test admin-only delete functionality using an authorized test account.
- [ ] Log out.
- [ ] Try opening `/dashboard` again.
- [ ] Test invalid credentials and backend errors.

### Common issues

| Problem | What to check |
|---|---|
| Network error | Is the backend running on port `7070`? |
| CORS error | Does the backend allow the frontend origin? |
| Registration fails | Does the request body match the backend controller? |
| Login works but dashboard data is missing | Does login return `token` and `data`, and does the list endpoint return `list`? |
| User list is unauthorized | Is the token sent in the Authorization header, and does the backend accept it? |
| Delete fails | Check the URL, user ID, token, role, and backend authorization |

## 13. Practice tasks for students

Complete these tasks in order:

1. Create a simple form with name and email inputs.
2. Use `useState` to store the input values.
3. Create a separate `Login` component.
4. Write a `handleChange` function for both inputs.
5. Explain what `e.preventDefault()` does.
6. Explain the difference between props and Context API.
7. Explain what `axios.post()` and `axios.get()` do.
8. Explain where the token is stored and when it is used.
9. Explain how `ProtectedRoute` works.
10. Explain the difference between `map()` and `filter()`.
11. Explain why the frontend must not be the only place that checks admin permissions.

## 14. Quick revision

| Concept | Simple meaning |
|---|---|
| Component | A reusable part of the UI |
| State | Data React remembers |
| Props | Data passed from parent to child |
| Context API | Shared data and functions |
| Axios | Makes HTTP requests to an API |
| `async/await` | Helps work with asynchronous operations |
| Token | A credential returned by the backend after successful authentication |
| `sessionStorage` | Stores values for the current browser tab session |
| React Router | Connects URLs to components |
| Protected route | Frontend check before displaying a route |
| `map()` | Transforms array items into rendered elements |
| `filter()` | Creates an array containing only matching items |
| CORS | Browser-enforced rules controlling cross-origin requests |

## Final advice

Understand the form first, then the API request, then Context, then routing, and finally the dashboard. Students should be able to explain each small piece before attempting to combine the whole project.
