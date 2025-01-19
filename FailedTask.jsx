import React from 'react'
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthProvider"



const FailedTask = ({data}) => {

    const {adminWatching}=useContext(AuthContext);
    
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-900 text-sm px-3 py-1 rounded'>{data.status}</h3>
                <h4 className='text-sm'>{data.deadline}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.title}</h2>
            <p className='text-sm mt-2'>
                {data.description}
            </p>
            {
                !adminWatching&&
                <div className='mt-6'>
                    <div className='w-full text-center bg-red-900 rounded font-medium py-1 px-2 text-xs'>Failed</div>
                </div>
            }
            
        </div>
  )
}

export default FailedTask