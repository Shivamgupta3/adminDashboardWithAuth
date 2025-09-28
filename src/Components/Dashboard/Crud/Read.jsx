import React, { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import axios from 'axios'

const Read = () => {

  const [data, setData] = useState([])
  const { id } = useParams();

  const { isOpen } = useOutletContext();

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <div
      className="flex-grow-1 p-4"
      style={{
        marginLeft: isOpen ? "250px" : "60px",
        transition: "margin 0.4s ease",
      }}
    >
      <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-5 pb-5 rounded'>
          <h3>Detail of User</h3>
          <div className='mb-2'>
            {/* <strong>Name: {data.firstName} {data.lastName}</strong> */}
            <strong>Name: {data.name}</strong>
          </div>
          <div className='mb-2'>
            <strong>Email: {data.email}</strong>
          </div>
          <div className='mb-2'>
            <strong>Phone: {data.phone}</strong>
          </div>
          <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
          <Link to='/home/dashboard' className='btn btn-primary ms-3'>Back</Link>
        </div>
      </div>
    </div>  
  )
}

export default Read