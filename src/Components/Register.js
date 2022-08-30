import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from "../Context/UserAuthContext"
import {
    Input,
    Button,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

const Register = () => {
    const { setName, setEmail, setPassword, name, email, password, isError, isMsg, handleRegister } = useUserAuth()
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className="w-1/4 p-5 bg-white rounded shadow-lg hover:ring-2 ring-slate-300">
                <h1 className='text-center text-2xl mb-10'>Register</h1>
                <form onSubmit={handleRegister} className='space-y-5'>
                    {
                        isError ?
                            <Alert status='error'>
                                <AlertIcon />
                                {isMsg}
                            </Alert> : ""
                    }
                    <Input type='text' placeholder='Name' onChange={e => setName(e.target.value)} value={name} />
                    <Input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} value={email} />
                    <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} />
                    <Button type='submit' className='w-full'>Register</Button>
                </form>
            </div>
            <h1 className='mt-5'>Don't have an account? <Link className='underline text-sky-600' to="/">Login</Link></h1>
        </div>
    )
}

export default Register