import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

  const {allUserData,setAllUserData,user,setUser,loggedInUserData,setLoggedInUserData,adminWatching,setAdminWatching} = useContext(AuthContext)

  console.log("user data=",allUserData);

  const clickHandler=(employee)=>{
    setLoggedInUserData(employee)
    setAdminWatching(true)
    setUser("employee")
  }

  console.log("all user data",allUserData)
   
  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
        <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
            <h3 className='text-lg font-medium w-1/5'>New Task</h3>
            <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
            <h5 className='text-lg font-medium w-1/5'>Completed</h5>
            <h5 className='text-lg font-medium w-1/5'>Failed</h5>
        </div>
        <div className=''>
        {allUserData && allUserData.map(function(elem,idx){
          if(elem.email!="admin@me.com")
            return <div key={idx} onClick={()=>{clickHandler(elem)}} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium  w-1/5'>{elem.name}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.newTasks}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.activeTasks}</h5>
            <h5 className='text-lg font-medium w-1/5 text-white'>{elem.completedTasks}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.failedTasks}</h5>
        </div>
        })}
        </div>
        
        
    </div>
  )
}

export default AllTask