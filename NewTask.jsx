import React from 'react'
import { useContext } from 'react'
import { AuthContext } from "../../context/AuthProvider"
import axios from 'axios';


const NewTask = ({data}) => {

    const {allUserData,setAllUserData,user,setUser,loggedInUserData,setLoggedInUserData,adminWatching} = useContext(AuthContext);
    


    console.log("data at new tASK=",data)

    const func=async()=>{
        const response=await axios.post('http://localhost:3000/api/v1/update',{
            taskId:data._id,
            empId:data.assignedToId,
            status:"active"
        });

          if(response&&response.data.success)
          {
            console.log(response.data);
            setLoggedInUserData(response.data.data);
          }
      }

    const clickHandler=()=>{
        func();
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-green-600 text-sm px-3 py-1 rounded'>{data.status}</h3>
                <h4 className='text-sm'>{data.deadline}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.title}</h2>
            <p className='text-sm mt-2'>
                {data.description}
            </p>
            <div className='mt-6'>
                {
                    !adminWatching&&
                <button onClick={clickHandler} className='bg-green-500 rounded font-medium py-1 px-2 text-xs'>Accept Task</button>

                }
            </div>
        </div>
    )
}

export default NewTask