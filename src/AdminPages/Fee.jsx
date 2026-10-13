import React, { useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'



const Fee = () => {

  const [students, setStudents] = useState()
  const [searchedStudent, setSeachedStudent]=useState()
  

  const [allfee,setAllFee]=useState([])
const [searchedfee, setSearchedFee] = useState([])
  const fetchStudents = async () => {
    try {
      const res = await axios.get('/Data/Student.json')
      setStudents(res.data)
      console.log(res.data);

    }
    catch (error) {
      console.log(error);

    }

    const fee =allfee.filter((f)=>{
      return f.RegNo===students?.RegNo
    })

    setSearchedFee(fee)



    const fetchFee=async()=>{
      try{
        const res=await axios.get('Data/fee.json')
        console.log(res.data);
        setAllFee(res.data)
        
        
      }
      catch(error){
        console.log(error);
        
      }
    }

    

    useEffact(() => {
      fetchStudents()
    }, [])
  }


  const fetchFee=async()=>{

  }

  const handleSearch=()=>{
    let st = students.find((t)=>{
      return t.PhoneNumber===search || t.Email === search || t.RegNo === search
    })
    setSeachedStudent(st)
  }
  return (
    <>
      <DashboardLayout>
        <div className="fee-collect-container">
          <div className="fee-collect-header">
            <input type="text" placeholder='search By Name,Email,number' onChange={(e)=>setSearch(e.target)} />
            <button onClick={handleSearch}>Search</button>
          </div>
{/* 
<div className="fee-table">
  <Table>
    <thead>
      <tr>
        <th>Reg No</th>
        <th>Fee Name</th>
        <th>Fee Name</th>
      </tr>
    </thead>
    <tbody>
      {
        searchedfee.map((f)=>{
          <tr>
            <td>{f.RegNo}</td>
            <td>{f.FeeType}</td>
            <td>{f.PaymentType}({f?.FeeMonth})</td>
            <td>{f.PaidAmount}</td>
            <td>{f.Amount-f.PaidAmount}</td>
          </tr>
        })
      } 
    </tbody>
  </Table>
</div> */}

          <div className="fee-collect-details">

          
                <label >{searchedStudent?.RegNo}</label>
                <label >{searchedStudent?.Name}</label>
                <label >{searchedStudent?.FatherName}</label>
                <label >{searchedStudent?.currentClass}</label>
                <label >Student's Profile:-</label>
                <span>Total Fee</span>
                <span>Due Fee</span>
              
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Fee