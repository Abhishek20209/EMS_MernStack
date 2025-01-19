import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import axios from 'axios';




const Login = ({handleLogin}) => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const {signUp,setSignUp}=useContext(AuthContext)


    const funcSignUp=async()=>{

        let response=null;

        try{

            response=await axios.post('http://localhost:3000/api/v1/signup',{
                email:email,password:password,name:name
            });

        }
        catch(error)
        {
            console.log("ERROR while signUp")
        }

        if(response&&response.data.success)
        {
            setSignUp(false)
            setEmail("")
            setPassword("")
            setName("")
        }
    }


    const submitHandler =(e)=>{
        e.preventDefault()

        if(!signUp)
        {
            handleLogin(email,password)
            setEmail("")
            setPassword("")
        }
        else
        {
            funcSignUp();
        }
        
    }

    const clickHandler=(e)=>{
        setSignUp(!signUp)
    }


  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className='border-2 rounded-xl border-emerald-600 p-20'>
            <form 
            onSubmit={(e)=>{
                submitHandler(e)
            }}
            className='flex flex-col items-center justify-center'>
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="email" placeholder='Enter your email' 
                />
                {
                    signUp && <input 
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    required 
                    className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-3 mt-3 px-6 rounded-full placeholder:text-gray-400' type="text" placeholder='Enter your Name' 
                    />
                }
                <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required 
                    className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' 
                />

                {
                     (!signUp)&&
                        <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Log in</button>       
                }

                {
                    (!signUp)&&
                    <div className='mt-7 text-white text-center border-none outline-none hover:bg-blue-400 font-semibold bg-black text-lg py-2 px-8 w-full rounded-full placeholder:text-white' onClick={clickHandler}>Sign Up</div>       
                }

                {
                     (signUp)&&
                        <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Sign Up</button>       
                }

                {
                    (signUp)&&
                    <div className='mt-7 text-white text-center border-none outline-none hover:bg-blue-400 font-semibold bg-black text-lg py-2 px-8 w-full rounded-full placeholder:text-white' onClick={clickHandler}>Log In</div>       
                }
            </form>
        </div>
    </div>
  )
}

export default Login