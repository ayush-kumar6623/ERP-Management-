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
                                {searchedfee?.map((f, index) => (
                                    <tr key={index}>
                                        <td>{f.RegNo}</td>
                                        <td>{f.FeeType}</td>
                                        <td>{f.PaymentType} ({f.FeeMonth})</td>
                                        <td>{f.paidAmount}</td>
                                        <td>{f.Amount - f.paidAmount}</td>
                                        <td><button>Pay</button></td>
                                    </tr>
                                ))}
                            </tbody>


                        </Table>
                        </div>
                        <div className="fee-section">
                          <h1>Fee Details</h1>
                          <label></label>

                    </div>

                </div>
            </DashboardLayout>
        </>
    )
}

export default Fee