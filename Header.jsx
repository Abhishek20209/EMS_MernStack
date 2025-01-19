import React, { useContext, useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'
import { AuthContext } from '../../context/AuthProvider'

// /context/AuthProvider

import { use } from 'react';

const Header = ({setLoggedInUserData,data}) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const {user,setUser,adminWatching,setAdminWatching}=useContext(AuthContext);

 

  const logOutUser = ()=>{
   
    setUser("");
    
    if(setLoggedInUserData)
      setLoggedInUserData(null);
    // window.location.reload()
  }

  const backFunc=()=>{
    setAdminWatching(false);
    setUser("admin");
  }

  
  return (
    <div className='flex items-end justify-between'>

        {
          (!adminWatching) && 
          <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{data?data.name:"Admin"} 👋</span></h1>
        }

        {
          (!adminWatching) && 
          <button onClick={logOutUser} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
        }

        {
          (adminWatching) && 
          <h1 className='text-2xl font-medium'>Progress of<br /> <span className='text-3xl font-semibold'>{data?data.name:"Admin"}</span></h1>
       
        }
          
        {
          (adminWatching) && 
          <button onClick={backFunc} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>back</button>
        }
    </div>
  )
}

export default Header