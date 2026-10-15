import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import "./CSS/Fee.css";



const Fee = () => {

  const [students, setStudents] = useState([])
  const [searchStudent, setSearchedStudent] = useState(null)
  const [allfee, setAllFee] = useState([])
  const [searchedfee, setSearchedFee] = useState(null)
  const [search, setSearch] = useState("")

  const [duePay, setduePay] = useState(null)
  const [DueFee ,setDueFee]=useState()

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/Data/Student.json')
      setStudents(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFee = async () => {
    try {
      const res = await axios.get('/Data/fee.json')
      setAllFee(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStudents()
    fetchFee()
  }, [])

  const handleSearch = () => {
    const st = students.find((t) => {
      return (
        t.PhoneNumber === search ||
        t.Email === search ||
        t.RegNo === search
      )
    })

    setSearchedStudent(st)

    const fee = allfee.filter((f) => {
      return f.RegNo === st?.RegNo
    })

    setSearchedFee(fee)
  }

  const handleSetPay = (f) => {
    setduePay(f)
    setDueFee(String(Number(f.Amount) - Number(f.paidAmount)))
  }
  const collectFee=()=>{
    const option ={
      key:"rzp_test_6kz5nGEzi8uXRw",
      amount:Number(DueFee)*100,
      
      currancy:'INR',
      name:'ERP-PORTAL',
      descraption:"Fee Payment",
      image:"/images/ERP-Logo.png",
      handler:function(response){
      alert("Payment Successful")
      },
      modal:{
        ondismiss:function(){
          alert("Payment Cancelled")
        }
      },
      theme:{
        color:"green"
      }
    }
    const rzpay =new window.Razorpay(option);
    rzpay.open()
  }

  return (
    <>
      <DashboardLayout>
        <div className="fee-collect-container">

          <div className="fee-collect-header">
            <input
              type="text"
              placeholder="Search by Name, Email, Number"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="fee-collect-details">
            <div className="form-row-top">
              <div className="form-row">
                <label>Roll No.</label>
                <span>{searchStudent?.RegNo}</span>
              </div>
              <div className="form-row">
                <label>Student Name</label>
                <span>{searchStudent?.Name}</span>
              </div>
              <div className="form-row">
                <label>Father Name</label>
                <span>{searchStudent?.FatherName}</span>
              </div>
            </div>
            <div className="form-row-top">

              <div className="form-row">
                <label>Current Class</label>
                <span>{searchStudent?.currentClass}</span>
              </div>

            </div>


          </div>

          <div className="fee-table">

            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Fee Name</th>
                  <th>Fee Month</th>
                  <th>Paid Amount</th>
                  <th>Due Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {searchedfee?.map((f) => (
                  <tr key={f._id}>
                    <td>{f.RegNo}</td>
                    <td>{f.FeeType}</td>
                    <td>{f.PaymentType} ({f.FeeMonth})</td>
                    <td>{f.paidAmount}</td>
                    <td>{f.Amount - f.paidAmount}</td>
                    <td>{(f.Amount - f.paidAmount === 0) ? "No-Due" : <button onClick={() => handleSetPay(f)}>Pay</button>}</td>
                  </tr>
                ))}


              </tbody>



            </Table>
          </div>
           <div className="fee-section">
    <h1>Fee Details</h1>

    <div className="Fee-box">
        <div className="fee">
            <div className="total-fee">
                <label>Total Fee:</label>
                <input
                    type="text"
                    placeholder="Enter Due Fee"
                    value={duePay?.Amount ?? ""}
                    disabled
                />
            </div>

            <div className="fee-type">
                <label>Fee Type:</label>
                <input
                    type="text"
                    placeholder="Enter Fee Type"
                    value={duePay?.PaymentType ?? ""}
                    disabled
                />
            </div>
        </div>

        <div className="fee-field">
            <label>Paid Amount</label>
            <input
                type="text"
                placeholder="Paid Amount"
                value={duePay?.paidAmount ?? ""}
                disabled
            />
        </div>

        <div className="fee-field">
            <label>Due Amount</label>
            <input
                type="number"
                placeholder="Enter Amount To Collect"
                onChange={(e) => setDueFee(e.target.value)}
                value={
                    duePay
                        ? DueFee ?? duePay.Amount - duePay.paidAmount
                        : ""
                }
                required
            />
        </div>

        <div className="fee-field">
            <label>Remark</label>
            <input
                type="text"
                placeholder="Enter Payment Remark"
            />
        </div>

        <div className="fee-action">
            <button type="button" onClick={collectFee}>
                Collect Fee
            </button>
        </div>
    </div>
</div>

        </div>
      </DashboardLayout>
    </>
  )
}

export default Fee