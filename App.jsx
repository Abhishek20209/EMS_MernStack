import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import axios from 'axios';


const App = () => {

  const {allUserData,setAllUserData,user,setUser,loggedInUserData,setLoggedInUserData} = useContext(AuthContext)

  const func=async()=>{
    const response=await axios.get('http://localhost:3000/api/v1/getAllEmployees')
      if(response)
      {
        console.log(response.data);
      }
  }

  useEffect(()=>{
    if(user==="admin")
    {
      //func();
      //setAllUserData(response.data);
      console.log("printing in useEffect")
      console.log(allUserData)
    }
  },[allUserData])



  // useEffect(()=>{
  //   const loggedInUser = localStorage.getItem('loggedInUser')
    
  //   if(loggedInUser){
  //     const userData = JSON.parse(loggedInUser)
  //     setUser(userData.role)
  //     setLoggedInUserData(userData.data)
  //   }

  // },[])


  const handleLogin = async (email, password) => {


    try {
      const response = await axios.post('http://localhost:3000/api/v1/signin', {
        email,
        password,
      });

      if (response.data.success) {
        // setMessage(response.data.message || 'Logged in successfully');
        // Perform further actions like storing the token or redirecting
        // if (response.data.token) {
        //   localStorage.setItem('token', response.data.token);
        // }
        console.log("yes logged in");
        console.log(response.data.data);
        

        if (email === 'admin@me.com' ) {
          
          setAllUserData(response.data.data)
          console.log("after setting",response.data)
          console.log("user data in app.jsx",allUserData)
          setUser('admin')

          //localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
          
        } else {
          setLoggedInUserData(response.data.data);
          // const employee = userData.find((e) => email == e.email && e.password == password)
          // if (employee) 
          {
            setUser('employee')
            //setLoggedInUserData(employee)
            //localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee',data:employee }))
          }
        }

      }else 
      {
        // console.log(response.data.message || 'Login failed');
      }
    } 
    catch (error) {
      console.log("an error occured");
    }

    // const userLoggedInData = await fetch(
    //   `${process.env.REACT_APP_BASE_URL}/login`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    
  }



  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard setLoggedInUserData={setLoggedInUserData} data={loggedInUserData} setUser={setUser} /> : null) }
    </>
  )
}

export default App