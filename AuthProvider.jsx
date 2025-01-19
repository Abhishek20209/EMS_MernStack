import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [allUserData, setAllUserData] = useState(null)
    const [user, setUser] = useState(null)
    const [signUp,setSignUp]=useState(false)
    const [loggedInUserData, setLoggedInUserData] = useState(null)
    const [adminWatching,setAdminWatching]=useState(false)


    // useEffect(() => {
    //     setLocalStorage()
    //     const {employees} = getLocalStorage()
    //     setAllUserData(employees)
    // }, [])
    
    // const [allEmployees,setAllEmployees]=useState(null);

    // useEffect(()=>{

    // })

    const value={
        allUserData,
        setAllUserData,
        user,
        setUser,
        signUp,
        setSignUp,
        loggedInUserData,
        setLoggedInUserData,
        adminWatching,
        setAdminWatching
    }
    

    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider