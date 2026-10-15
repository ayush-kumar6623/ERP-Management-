import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../Components/DashboardLayout'

const Dashboard = () => {

  // usestate
  const navigate = useNavigate()
  const [role,setRole]=useState()
  useEffect(()=>{
    let token = localStorage.getItem("token")
    setRole(localStorage.getItem("role"))
    if(!token){
      navigate('/login')
    }
  },[])



  return (
   <>
    <DashboardLayout>

      {
        role =="admin"?(
          <h2>This is Admin Page</h2>
        ):role=='supperAdmin'?(
          <h1>This is Super Admin page</h1>
        ):(
          <h1>This is teacher Page</h1>
        )
      }


    </DashboardLayout>
   </>
  )
}

export default Dashboard