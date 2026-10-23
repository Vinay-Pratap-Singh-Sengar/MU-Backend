import { useState } from "react";

function Registration(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleName =(e) =>{
        console.log(e.target.value)
        setName(e.target.value);
    }
    const handlePassword = (e) =>{
        console.log(e.target.value)
        setPassword(e.target.value);
    }
    const handleEmail = (e) =>{
        console.log(e.target.value)
        setEmail(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(name, email, password)
    }
    return (
        <>
            <h1>This is Registration Page</h1>
            <form>
                <label htmlFor="">Enter your name : </label>
                <input type="text" value={name} onChange={handleName}/>

                <hr />
                <label htmlFor="">Enter your email:</label>
                <input type="email" value={email} onChange={handleEmail}/>

                <hr />
                <label htmlFor="">Enter your password : </label>
                <input type="password" value={password} onChange={handlePassword} />
                <hr />
                <input type="submit" onClick={handleSubmit} />
            </form>
        </>
    )
}
export default Registration;