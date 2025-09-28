import { useFormik } from 'formik'
import React from 'react'
import { signupSchema } from '../../schema/index'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Update = () => {

  const [data, setData] = useState([])
  const { id } = useParams();
  const navigate = useNavigate()
  const { isOpen } = useOutletContext();

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [id])

  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      // firstName: data?.firstName || "",
      // lastName: data?.lastName || "",
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
    },
    enableReinitialize: true,
    onSubmit: values => {
      console.log("Updated Values:", values)
      axios.put(`https://dummyjson.com/users/${id}`, values)
        .then(res => {
          setData(res.data)
          navigate('/home/dashboard')
        })
    }
  })

  return (
    <div
      className="flex-grow-1 p-4"
      style={{
        marginLeft: isOpen ? "250px" : "60px",
        transition: "margin 0.4s ease",
      }}
    >
      <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border-dark bg-white shadow px-5 pt-3 pb-5 rounded'>
          <h1>Update User</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label htmlFor="name">First Name:</label>
              <input
                className='form-control'
                id='name'
                name='name'
                type="text"
                placeholder='Enter your name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="name">Last Name:</label>
              <input
                className='form-control'
                id='lastName'
                name='lastName'
                type="text"
                placeholder='Enter your name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="name">Email:</label>
              <input
                className='form-control'
                id='email'
                name='email'
                type="email"
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="name">Phone:</label>
              <input
                className='form-control'
                id='phone'
                name='phone'
                type="text"
                placeholder='Enter your number'
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button type="submit" className='btn btn-success'>Update</button>
            <Link to='/home/dashboard' className='btn btn-primary ms-3'>Back</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update