import {
    createContext, useContext, useState
} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { setUserLocal } from "../utils/auth"

const userAuthContext = createContext()
export function UserAuthContextProvider({ children }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [isMsg, setIsMsg] = useState("")
    const navigate = useNavigate()
    const handleClear = () => {
        setName("")
        setEmail("")
        setPassword("")
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("https://test-binar.herokuapp.com/auth/login", {
                email: email,
                password: password
            })
            if (response.data.result) {
                setUserLocal(response.data.result.access_token)
                navigate("/dashboard", { replace: true })
            } else {
                setIsError(true)
            }
        } catch (errors) {
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("https://test-binar.herokuapp.com/auth/signup", {
                name: name,
                email: email,
                password: password
            })
            if (response.data.result) {
                navigate("/", { replace: true })
            } else {
                console.log(response.data);
                setIsError(true)
                setIsMsg("Email " + response.data.errors.email)
            }
            console.log(response);
        } catch (error) {
        }
    }


    const value = {
        setEmail,
        email,
        setPassword,
        password,
        isError,
        handleLogin,
        setName,
        name,
        isMsg,
        handleRegister,
        handleClear
    }
    return (
        <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
    )
}

export const useUserAuth = () => useContext(userAuthContext)