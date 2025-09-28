import { useFormik } from 'formik'
import React from 'react'
import { signupSchema } from '../../schema/index'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
    const { isOpen } = useOutletContext();
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        onSubmit: async (values, actions) => {

            const res = await axios.get('https://dummyjson.com/users')
            const users = res.data

            const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id) || 0)) : 0;
            const newUser = { id: String(maxId + 1), ...values };

            await axios.post('https://dummyjson.com/users', newUser)
                .then(res => {
                    console.log("Values: ", values)
                })
                .catch(err => console.log(err))
            actions.resetForm()
        },
        // validationSchema: signupSchema,
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
                    <h1>Add a User</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="name">Name:</label>
                            <input
                                className='form-control'
                                id='name'
                                type="text"
                                placeholder='Enter your name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name && (
                                <p style={{ color: "red", fontSize: '10px' }}>{errors.name}</p>
                            )}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="name">Email:</label>
                            <input
                                className='form-control'
                                id='email'
                                type="email"
                                placeholder='Enter your email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && (
                                <p style={{ color: "red", fontSize: '10px' }}>{errors.email}</p>
                            )}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="name">Phone:</label>
                            <input
                                className='form-control'
                                id='phone'
                                type="text"
                                placeholder='Enter your number'
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone && (
                                <p style={{ color: "red", fontSize: '10px' }}>{errors.phone}</p>
                            )}
                        </div>
                        <button type="submit" className='btn btn-success'>Submit</button>
                        <Link to='/home/dashboard' className='btn btn-primary ms-3'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create