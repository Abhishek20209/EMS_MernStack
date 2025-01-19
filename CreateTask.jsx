import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import axios from 'axios'

const CreateTask = () => {

    const {allUserData,setAllUserData,user,setUser} = useContext(AuthContext)
    

    //const {userData, setUserData} = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDeadline, setTaskDeadline] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState('')

    const [newTask, setNewTask] = useState({})

    const submitHandler = async (e) => {
        e.preventDefault()
        
        let response=null

        try{

            response=await axios.post('http://localhost:3000/api/v1/createTask',{
                title:taskTitle, description:taskDescription, deadline:taskDeadline, email:email
            },{
                withCredentials: true, // Important to send cookies with the request
            });

        }
        catch(error)
        {
            console.log("ERROR WHILE SENDING THE CREATEtASK REQUEST")
        }
        
        
        console.log("response after sending the create Task data",response);
        if(response && response.data.success)
        {
            setAllUserData(response.data.data);
            //setNewTask({ title:taskTitle, description:taskDescription, deadline:taskDeadline, category, email:email })

        }


        

        // const data = userData

        // data.forEach(function (elem) {
        //     if (email == elem.firstName) {
        //         elem.tasks.push(newTask)
        //         elem.taskCounts.newTask = elem.taskCounts.newTask + 1
        //     }
        // })

        // setUserData(data)
        // console.log(data);

        setTaskTitle('')
        setCategory('')
        setEmail('')
        setTaskDeadline('')
        setTaskDescription('')

    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='flex flex-wrap w-full items-start justify-between'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDeadline}
                            onChange={(e) => {
                                setTaskDeadline(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='employee name' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id=""></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask