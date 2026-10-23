import { createContext, useContext, useState } from "react";

// create context : it is a box that holds global value
const UserContext = createContext();

// share the data with child element
export const UserProvider = ({children}) =>{
    const [name , setName] = useState("vinay");

    return (
        <UserContext.Provider value = {{name, setName}}>
            {children}
        </UserContext.Provider>
    )
}


// useContext : allows componet to access share data
export const useUser = () => {
    return useContext(UserContext)
}
